#!/usr/env python3
import socket,sys
HOST = "localhost"
PORT = 54321
s=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)                    #SOCK_DGRAM是UDP传输协议
s.connect((HOST,PORT))

msg = input("输入:")
s.sendall(bytes(msg,"utf-8"))
while 1:
    buf,_ = s.recvfrom(2048)
    if buf:
        print(str(buf,"utf-8"))
        s.close()
        break
