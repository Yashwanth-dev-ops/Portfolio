package loadbalancer

import (
	"sync"
	"sync/atomic"
)

// Target represents a backend service instance
type Target struct {
	URL    string
	Alive  bool
	Weight int // 1-10
}

// LoadBalancer manages the distribution of requests
type LoadBalancer struct {
	targets []*Target
	current uint64
	mu      sync.RWMutex
}

// NewLoadBalancer creates a new LB instance
func NewLoadBalancer(urls []string) *LoadBalancer {
	var targets []*Target
	for _, url := range urls {
		targets = append(targets, &Target{
			URL:    url,
			Alive:  true,
			Weight: 1,
		})
	}
	return &LoadBalancer{
		targets: targets,
	}
}

// NextTarget returns the next target using Round Robin
func (lb *LoadBalancer) NextTarget() *Target {
	lb.mu.RLock()
	defer lb.mu.RUnlock()

	// Atomic increment for thread-safe round robin
	next := atomic.AddUint64(&lb.current, 1)
	len := uint64(len(lb.targets))

	// Simple Round Robin
	idx := next % len
	return lb.targets[idx]
}

// AddTarget allows dynamic scaling (adding new instances)
func (lb *LoadBalancer) AddTarget(url string) {
	lb.mu.Lock()
	defer lb.mu.Unlock()
	lb.targets = append(lb.targets, &Target{URL: url, Alive: true, Weight: 1})
}
