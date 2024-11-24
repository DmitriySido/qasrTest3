import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export function useSocket(url: string) {
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null,
  );

  useEffect(() => {
    console.log(`useEffect for socket connection`);

    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
    console.log(`socket.current = ${socket.current}`);
    // if (!socket.current) {
    console.log(`socket.current`);
    console.log(socket.current);
    if (backUrl === 'http://127.0.0.1:3333') {
      socket.current = io(backUrl, {
        transports: ['websocket', 'polling'],
      });
    } else {
      socket.current = io(backUrl, {
        path: '/fake',
        transports: ['websocket', 'polling'],
      });
      console.log(`socket connected to back`);
    }
    socket.current.on('connect', () => {
      console.log('Socket connected:', socket.current?.id);
    });
    console.log(socket.current);
    // }

    // Подключение к серверу Socket.IO

    // Отключение сокета при размонтировании компонента
    return () => {
      console.log(`socked disconnected`);
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return socket;
}
