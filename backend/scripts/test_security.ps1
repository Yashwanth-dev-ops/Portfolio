# Security Test Suite

$BaseUrl = "http://localhost:8080/api"

function Test-Endpoint($Name, $Body) {
    Write-Host "Testing $Name..." -ForegroundColor Cyan
    try {
        $Response = Invoke-WebRequest -Uri "$BaseUrl/contact" -Method POST -Body $Body -ContentType "application/json" -ErrorAction Stop
        Write-Host "  Response Code: $($Response.StatusCode)" -ForegroundColor Green
        Write-Host "  Response Body: $($Response.Content)" -ForegroundColor Gray
        return $Response
    } catch {
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
             Write-Host "  Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        }
    }
}

# 1. Valid Request
Write-Host "`n--- 1. Valid Request Integrity Check ---" -ForegroundColor Yellow
$Valid = @{
    name = "Security Tester"
    email = "test@example.com"
    message = "This is a valid test."
} | ConvertTo-Json
Test-Endpoint "Valid Request" $Valid

# 2. XSS Attack Simulation
Write-Host "`n--- 2. XSS Attack Simulation ---" -ForegroundColor Yellow
$XSS = @{
    name = "<script>alert('PWNED')</script>"
    email = "hacker@evil.com"
    message = "<img src=x onerror=alert(1)>"
} | ConvertTo-Json
Test-Endpoint "XSS Payload" $XSS

# 3. Rate Limit Stress Test
Write-Host "`n--- 3. Rate Limit Stress Test (DoS Simulation) ---" -ForegroundColor Yellow
Write-Host "Sending 10 requests rapidly (Limit is 5/min)..."
for ($i=1; $i -le 10; $i++) {
    Write-Host "Request $i..." -NoNewline
    try {
        $r = Invoke-WebRequest -Uri "$BaseUrl/contact" -Method POST -Body $Valid -ContentType "application/json" -ErrorAction Stop
        Write-Host " OK ($($r.StatusCode))" -ForegroundColor Green
    } catch {
        Write-Host " BLOCKED ($($_.Exception.Response.StatusCode))" -ForegroundColor Magenta
    }
}
