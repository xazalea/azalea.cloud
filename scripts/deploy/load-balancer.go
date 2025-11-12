package main

// Azalea Cloud Load Balancer
// Adapted from https://github.com/andrewarrow/devops
// Provides zero-downtime deployment with blue-green pattern

import (
	"crypto/tls"
	"fmt"
	"net/http"
	"net/http/httputil"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/foomo/simplecert"
	"github.com/foomo/tlsconfig"
)

var (
	WebPort        = 3000 // Active port (receives 100% traffic)
	BackendPort    = 8080 // Backend service port
	ReverseProxyWeb *httputil.ReverseProxy
	ReverseProxyBackend *httputil.ReverseProxy
	mu            sync.RWMutex
	BalancerGUID  = os.Getenv("BALANCER_GUID")
)

func makeReverseProxy(targetPort int, isBackend bool) *httputil.ReverseProxy {
	target := fmt.Sprintf("http://localhost:%d", targetPort)
	director := func(req *http.Request) {
		req.URL.Scheme = "http"
		req.URL.Host = target
		req.Header.Set("X-Forwarded-Host", req.Header.Get("Host"))
		req.Header.Set("X-Real-IP", req.RemoteAddr)
	}
	return &httputil.ReverseProxy{Director: director}
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	
	// Handle deployment switch endpoint
	if strings.HasPrefix(path, "/"+BalancerGUID+"/") {
		handleDeploymentSwitch(w, r, path)
		return
	}
	
	// Route to backend services
	if strings.HasPrefix(path, "/api/") || strings.HasPrefix(path, "/backend/") {
		mu.RLock()
		proxy := ReverseProxyBackend
		mu.RUnlock()
		if proxy != nil {
			proxy.ServeHTTP(w, r)
			return
		}
	}
	
	// Route to web app (active port)
	mu.RLock()
	proxy := ReverseProxyWeb
	mu.RUnlock()
	if proxy != nil {
		proxy.ServeHTTP(w, r)
		return
	}
	
	http.Error(w, "Service unavailable", http.StatusServiceUnavailable)
}

func handleDeploymentSwitch(w http.ResponseWriter, r *http.Request, path string) {
	// Extract target port from path: /GUID/3000 or /GUID/3001
	parts := strings.Split(path, "/")
	if len(parts) < 3 {
		http.Error(w, "Invalid deployment path", http.StatusBadRequest)
		return
	}
	
	var targetPort int
	if parts[2] == "3000" {
		targetPort = 3000
	} else if parts[2] == "3001" {
		targetPort = 3001
	} else {
		http.Error(w, "Invalid port", http.StatusBadRequest)
		return
	}
	
	// Switch active port
	mu.Lock()
	if WebPort == 3000 {
		WebPort = 3001
	} else {
		WebPort = 3000
	}
	ReverseProxyWeb = makeReverseProxy(WebPort, false)
	mu.Unlock()
	
	fmt.Fprintf(w, "Switched to port %d\n", WebPort)
}

func handleLocal(w http.ResponseWriter, r *http.Request) {
	// Local endpoint to check current active port
	mu.RLock()
	port := WebPort
	mu.RUnlock()
	fmt.Fprintf(w, "Current active port: %d\n", port)
}

func Serve() {
	domainList := os.Getenv("BALANCER_DOMAINS")
	ReverseProxyBackend = makeReverseProxy(BackendPort, true)
	ReverseProxyWeb = makeReverseProxy(WebPort, false)

	cfg := simplecert.Default
	cfg.Domains = strings.Split(domainList, ",")
	cfg.CacheDir = "/certs"
	cfg.SSLEmail = os.Getenv("BALANCER_EMAIL")
	certReloader, err := simplecert.Init(cfg, nil)
	if err != nil {
		fmt.Printf("Certificate error: %v\n", err)
	}

	// HTTP redirect to HTTPS
	go http.ListenAndServe(":80", http.HandlerFunc(simplecert.Redirect))
	
	// Local status endpoint
	go http.ListenAndServe(":8082", http.HandlerFunc(handleLocal))

	tlsconf := tlsconfig.NewServerTLSConfig(tlsconfig.TLSModeServerStrict)
	tlsconf.GetCertificate = certReloader.GetCertificateFunc()

	handler := http.HandlerFunc(handleRequest)

	s := &http.Server{
		Addr:      ":443",
		Handler:   handler,
		TLSConfig: tlsconf,
	}

	s.ListenAndServeTLS("", "")

	for {
		time.Sleep(time.Second)
	}
}

func main() {
	Serve()
}

