# LudoAR

A web application on Three.js and WebXR.

# Get Started

### Prerequisites
Python 3.x installed on your system.
SSL certificate and key files.

## Step 1: Create a Python Script
Create a Python script (e.g., secure_server.py) and paste the following code into it:

```
import http.server
import ssl
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8080
HOST = '0.0.0.0'

Handler = SimpleHTTPRequestHandler

Handler.extensions_map = {
    '.manifest': 'text/cache-manifest',
    '.html': 'text/html',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.svg': 'image/svg+xml',
    '.css': 'text/css',
    '.js': 'application/x-javascript',
    '': 'application/octet-stream',
}

httpd = HTTPServer((HOST, PORT), Handler)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile='path/to/certfile', keyfile='path/to/keyfile')

httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print("Serving at port", PORT)
httpd.serve_forever()
```

## Step 2: Obtain SSL Certificates
Ensure you have an SSL certificate and key files. If you don't have these, you can generate self-signed certificates using OpenSSL:

``` 
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

This command will generate key.pem and cert.pem files.

## Step 3: Configure the Script
Update the certfile and keyfile paths in the script with the paths to your SSL certificate and key files:

`` context.load_cert_chain(certfile='path/to/cert.pem', keyfile='path/to/key.pem') ``

## Step 4: Run the Server
Run the Python script to start the server:

``` 
python secure_server.py
```

The server will start and listen for HTTPS requests on port 8080.

### Accessing the Server
Open a web browser in any device on your local network and navigate to https://"IP of the machine running the server":8080. If you're using a self-signed certificate, you may need to bypass security warnings.
