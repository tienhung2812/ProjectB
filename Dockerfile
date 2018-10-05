# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang:1.10 AS builder

# Download and install the latest release of dep
ADD https://github.com/golang/dep/releases/download/v0.4.1/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep


# Copy the code from host and compile it

# Copy the local package files to the container's workspace.
ADD . /go/src/github.com/ridehub/back-end/ridehub-golang
WORKDIR /go/src/github.com/ridehub/back-end/ridehub-golang

# Build the outyet command inside the container.
# (You may fetch or manage dependencies here,
# either manually or with a tool like "godep".)
#RUN go build github.com/golang/ridehub/back-end/server
RUN go get github.com/tools/godep
RUN go get github.com/gin-gonic/gin
RUN go install /go/src/github.com/ridehub/back-end/ridehub-golang 
# Run the outyet command by default when the container starts.
ENTRYPOINT /go/bin/ridehub-golang

# Document that the service listens on port 8080.

EXPOSE 8080

#CMD ["go run", "main.go"]
