#!/usr/env python3
import socket,traceback
HOST = ''
PORT = 54321
s=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)                    #SOCK_DGRAM是UDP传输协议
s.bind((HOST,PORT))
print("started at {HOST}:{PORT}".format(HOST=HOST,PORT=PORT))
while True:
    try:
        data,address = s.recvfrom(51424)
        print(data)
        print(address)
        s.sendto(bytes("helloworld {data} from {address}".format(
            data=str(data,"utf-8"),address=address),"utf-8"),address)
    except (KeyboardInterrupt, SystemExit):
        raise
    except:
        traceback.print_exc()
