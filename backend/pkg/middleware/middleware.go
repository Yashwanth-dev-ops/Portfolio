package middleware

import (
	"log"
	"net/http"
	"time"
)

// Logger is a structured logging middleware
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Wrap ResponseWriter to capture status code
		WrappedWriter := &responseWriter{ResponseWriter: w, status: 200}

		next.ServeHTTP(WrappedWriter, r)

		latency := time.Since(start)

		// Structured Log Output
		log.Printf(
			"[REQUEST] %s | %s | Status: %d | Latency: %v | IP: %s | User-Agent: %s",
			r.Method,
			r.URL.Path,
			WrappedWriter.status,
			latency,
			r.RemoteAddr,
			r.UserAgent(),
		)
	})
}

// SecureHeaders adds security-related headers to responses
func SecureHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Strict Transport Security (HSTS) - Enforce HTTPS for 1 year
		w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")

		// Content Security Policy (CSP) - Restrict resources to same origin + necessary externals
		w.Header().Set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;")

		// Prevent MIME type sniffing
		w.Header().Set("X-Content-Type-Options", "nosniff")

		// Prevent Clickjacking
		w.Header().Set("X-Frame-Options", "DENY")

		// XSS Protection (Legacy browsers, but good depth)
		w.Header().Set("X-XSS-Protection", "1; mode=block")

		// Referrer Policy
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

		next.ServeHTTP(w, r)
	})
}

// EnableCORS handles Cross-Origin Resource Sharing
func EnableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// In production, change "*" to the specific frontend domain
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// responseWriter wrapper to capture status code
type responseWriter struct {
	http.ResponseWriter
	status int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.status = code
	rw.ResponseWriter.WriteHeader(code)
}
