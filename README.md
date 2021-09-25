## Demo app to send server-side events from python (fastapi) and receive events using React.

Server Sent Events are a standard allowing browser clients to receive a stream of updates from a server over a HTTP connection without resorting to polling. Unlike WebSockets, Server Sent Events are a one way communications channel - events flow from server to client only.

Server-Sent Events (SSE) is often overshadowed by its two big brothers — Web Sockets and Long-Polling. However, there are many practical use cases for using SSE. Updating dynamic content, sending push notifications, and streaming data in Real-time are just a few of the applications that SSE can be utilized for. We implement a simple SSE application with FastAPI and React.

> Traditionally, a web page has to send a request to the server to receive new data; that is, the page requests data from the server. With server-sent events, it’s possible for a server to send new data to a web page at any time, by pushing messages to the web page.

You can think of SSE as a unidirectional websocket. Only the server can send messages to subscribed clients. There are many web applications where web sockets maybe overkill. For example, updating the price of an item on a product page does not need bidirectional communication. The server simply needs one-way communication to update prices for all of its clients. This is a perfect use case for SSE.

In short, SSE is a great tool for streaming quick real-time data. They offer unidirectional communication from a server to its clients and are typically used for updating dynamic content on web pages.

We will be using python and FastAPI. FastAPI is a great tool for SSE applications as it is really easy to use and is built upon starlette which has SSE capabilities built in.

When working with Server Sent Events, communications between client and server are initiated by the client (browser). The client creates a new JavaScript EventSource object, passing it the URL of an endpoint which is expected to return a stream of events over time.

The server receives a regular HTTP request from the client (these should pass through firewalls etc like any other HTTP request which can make this method work in situations where WebSockets may be blocked). The client expects a response with a series of event messages at arbitrary times. The server needs to leave the HTTP response open until it has no more events to send, decides that the connection has been open long enough and can be considered stale, or until the client explicitly closes the initial request.

Every time that the server writes an event to the HTTP response, the client will receive it and process it in a listener callback function.

## Client Side

```javascript
const evtSource = new EventSource("http://127.0.0.1:8000/stream");

useEffect(() => {
  evtSource.addEventListener("new_message", function (event) {
    // Logic to handle status updates
    setMessage((messages) => [...messages, event.data]);
  });

  evtSource.addEventListener("end_event", function (event) {
    setMessage((messages) => [...messages, event.data]);
    evtSource.close();
  });

  return () => {
    evtSource.close();
  };
}, []);
```

## Server side

```python
from sse_starlette.sse import EventSourceResponse

@app.get("/stream")
async def message_stream(request: Request):
    async def event_generator():
        while True:
            if await request.is_disconnected():
                logger.debug("Request disconnected")
                break

            # Checks for new messages and return them to client if any
            counter, exists = get_message()
            if exists:
                yield {
                    "event": "new_message",
                    "id": "message_id",
                    "retry": MESSAGE_STREAM_RETRY_TIMEOUT,
                    "data": f"Counter value {counter}",
                }
            else:
                yield {
                    "event": "end_event",
                    "id": "message_id",
                    "retry": MESSAGE_STREAM_RETRY_TIMEOUT,
                    "data": "End of the stream",
                }

            await asyncio.sleep(MESSAGE_STREAM_DELAY)

    return EventSourceResponse(event_generator())
```

Check out the code to get the working example.
