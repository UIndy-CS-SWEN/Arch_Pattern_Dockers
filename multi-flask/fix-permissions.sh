#!/bin/bash
# Fix permissions for haproxy.cfg
chmod 644 /usr/local/etc/haproxy/haproxy.cfg
# Start HAProxy
exec haproxy -f /usr/local/etc/haproxy/haproxy.cfg
