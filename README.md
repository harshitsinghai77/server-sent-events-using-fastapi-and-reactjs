## Demo app to send server-side events from python (fastapi) and receive events using React.

Server-Sent Events (SSE) is often overshadowed by its two big brothers — Web Sockets and Long-Polling. However, there are many practical use cases for using SSE. Updating dynamic content, sending push notifications, and streaming data in Real-time are just a few of the applications that SSE can be utilized for. We implement a simple SSE application with FastAPI and React.

> Traditionally, a web page has to send a request to the server to receive new data; that is, the page requests data from the server. With server-sent events, it’s possible for a server to send new data to a web page at any time, by pushing messages to the web page.

You can think of SSE as a unidirectional websocket. Only the server can send messages to subscribed clients. There are many web applications where web sockets maybe overkill. For example, updating the price of an item on a product page does not need bidirectional communication. The server simply needs one-way communication to update prices for all of its clients. This is a perfect use case for SSE.

In short, SSE is a great tool for streaming quick real-time data. They offer unidirectional communication from a server to its clients and are typically used for updating dynamic content on web pages.

We will be using python and FastAPI. FastAPI is a great tool for SSE applications as it is really easy to use and is built upon starlette which has SSE capabilities built in.

We send Server-sent events using FastAPI backend and then receive the events using React.
