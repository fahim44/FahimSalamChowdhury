---
title: "Http request methods"
date: 2021-01-25T22:56:59+06:00
draft: true
toc: true
images:
tags:
  - web
---

To indicate what action should be taken on a *Resource*, *HTTP* provides some pre-defined **Request Methods**.
Because of reffering actions, thses methods are sometimes reffered as *HTTP verbs*.

{{< image src="/img/sign_up_today.webp" alt="Request Header" position="center" style="border-radius: 8px;" >}}

## Features of HTTP Methods
Although they are semantically difference, HTTP Methods share some common features/quality among them.

### Safe
An Http method is called *safe*, if it doesn't change any server state.
Meaning, if the Http method's main operation is *read-only*, then the method is *safe*.
For example, `GET`, `HEAD`, `OPTIONS` are some safe http methods.

A *safe* method **should not change** any server state.
It's only purpose is retrieve ready-only data.
Although server itself can change its status when calling safe method, for example server can log the calling of the method.
The main reason of safe methods not to change the server status is; these methods are "*open*", meaning anybody can see what information they are passing to manupulate the server.
And again, web crawlers rely on calling safe methods.

So, in-sort, making an order via calling `GET` methood = BAD IDEA.

One last note... **All safe methods are idempotent, but not all idempotent methods are safe.**
For example, `PUT` and `DELETE` are both idempotent but unsafe.

### Idempotent
A Http method is called *idempotent*, when identical multiple reuquests with same effect leave the server into same state.
Meaning if you make same request multiple time, server will always be change to same state.

For example, `GET`, `HEAD`, `OPTIONS` keep the server state intact. So that they are idempotent.
Again, `PUT` & `DELETE` with same parameter only change the server state for the first time request, following requests don't change anything. So they are also idempotent.
But, when requesting `POST` with same parameter multiple times, server might create new entities for every request. That's why `POST` is not idempotent.

In sort, idempotent methods have no side effect. Servers can save analytic data for each request, but as they don't change the server's actual state anyway, we can ignore them.

Last but not least, this feature actually depends on deveoper.
Suppose, you develop an api `DELETE /user/{id}`, then we can say it is idempotent, because for first successful delete it will return `2xx` response, the later requests will always return `4xx` status, because the requests will not affect the server state anymore.
But if we develop an api `DELETE /user/lastEntry`, then it is not idempotent. 
Because every request to this api, will delete last current row every time, thus changing the server state every time.

### Cacheable
Client for example browser can cache some http responses.
Not all http responses can be cached.
There are some constrains which should be passed to be able to cache http responses.

1. Http method should be cacheable.
`GET` & `HEAD` methods are eligible for caching.
`POST` & `PATCH` methods can be cached if the `Content-Location` header is set, although most of the clients don't implement it.
`PUT` and `DELETE` methods are not cacheable.

2. Fix response status codes make the response cache considerables.
These status codes are `200`, `203`, `204`, `206`, `300`, `301`, `404`, `405`, `410`, `414`, and `501`.

3. Some specific headers like `Cache-Control` can prevent caching.

Note that some non-cacheable requests/responses to a specific URI may invalidate previously cached responses on the same URI.

## HTTP Methods
There are 9 types of Http methods.
Of them, 4 are most known (`GET`, `POST`, `PUT`, `DELETE`) & 2 are mostly used (`GET`, `POST`) methods.

### GET
The `GET` methods requests to **read** any specified resource.
GET should only be used to retrieve data.
Data is passed to the caller as the response body.
GET is [safe](#safe), [idempotent](#idempotent), [cacheable](#cacheable).
GET is also allowed in the *HTML forms*.

Althouth there is no prohibition from the specification, Some existing implementation may not support sending body/payload in the GET request.
So, it is better not to send payload in the GET request.

### POST

### PUT
`PUT` is used to **create new if not already present, else update the existing** a specific resource.
`PUT` is used to update the *whole entity*.
The main difference between it & [post](#post) is, `PUT` is [idempotent](#idempotent), but POST is not.

`PUT` has request body but no successful response body.
It is not [safe](#safe) & [cacheable](#cacheable), & not allowed in the *HTML forms*.

### DELETE
Http method `DELETE` is used to **delete/remove** a specific resource.

`DELETE` may have request body and successful response body.
It is [idempotent](#idempotent), but not [safe](#safe) & [cacheable](#cacheable).
`DELETE` is not allowed in the *HTML forms*.

### PATCH

### HEAD
Same as [`GET`](#get), `HEAD` http method requests to **read** specific resource.
The differece between these two is `GET` is interested in actual data, where `HEAD` is interested on *status of the data*. 
Again, HEAD is faster than GET request.

HEAD method requests for [HTTP HEADERS](#http-headers).
HEAD method doesn't support data passing via request/response body.
HEAD is [safe](#safe), [idempotent](#idempotent), [cacheable](#cacheable).
HEAD is not allowed in the *HTML forms*.

For example, an url makes a request for large download. 
Instead of actually downloading the data, HEAD request could read its `Content-Length` header to check the filesize without actually downloading the file.

Another example is hashing. 
Suppose a browser is caching data. 
Before making any GET request to a particular url to retrieve the actual data everytime, we can make HEAD request to check the hash code if the data is changed or not.
If not changed, we can show the data from the cache.
Or if changed, we can make the GET request to retrieve the actual data.

- #### HTTP HEADERS
`HEADERS` let the client & server pass additional informatiion with an HTTP request or response.
A header passes data in *key-value* pair syntax, having `:` between them as separator.
A header dosen't hold actual data, but information of the data.
There are various types of headers, for example, *General headers*, *Request headers*, *Response headers*, *Entity headers*.

### CONNECT
Http method `CONNECT` is used open a *tunnel* between client and server identified by the target resource.
It starts a *two-way communication* between client & server.
`CONNECT` method can be used to access websites that use *SSL* or *HTTPS*.

For example, the client asks the *HTTP proxy server* to tunnel *TCP connection* to desired destination using CONNECT method.
The proxy server makes the connection on behalf of the client.
When connection is established, the proxy server continues to proxy the TCP stream to and from the client.

Some proxy servers might need authority to create a tunnel using [Proxy-Authorization](#proxy-authorization) request header.

`CONNECT` has no request body, but has successful response body.
It is not [safe](#safe), [idempotent](#idempotent), [cacheable](#cacheable).
`CONNECT` is not allowed in the *HTML forms*.

- #### Proxy-Authorization
`Http Proxy-Authorization request header` contains the credential to authenticate a client to proxy server. It is required to pass with the request if server responded before with `407` `Proxy Authentication Required` status code with `Proxy-Authonticate` response header.

`Proxy-Authorization` syntax is:
```html
Proxy-Authorization: <type> <credentials>
```
Here, `<type>` will be replaced with `Authentication type`.
The most common type is `Basic`.

the `<credentials>` will be replaced with client's credential.
The credential is generated by following steps:
- The username and the password are combined with a colon (`:`) (example: `username:password`)
- Encode the resulting string into **Base64**.

### OPTIONS
Http method `OPTIONS` provides response of what communcation options are permitted for targeted resource.
`OPTIONS` can be used to identify what **other Http methods** are allowed for the specific resource.
It is also used as [preflightd request](#preflighted-requests-in-cors) by mordern browser to support **CORS**.
Client can specify a url or use `*` for whole server to get list of allowed options with `OPTIONS` method.

Popular server (for example: Tomcat) normally configure `OPTIONS` methods for whole server & specific urls autometically.

`OPTIONS`  has no request body, but has successful response body.
It is [safe](#safe) & [idempotent](#idempotent), but not [cacheable](#cacheable).
`OPTIONS` is not allowed in the *HTML forms*.

- #### Preflighted requests in CORS
In mordern browsers, when from inside of any domain (for example, `a.com`), we try to call another domain's (`b.com`) any resource (`GET b.com/users` using *ajax* call), browsers don't call the method right-away.
Instead it calls `OPTIONS b.com/users` first, to check if `a.com` is eligible to call `GET b.com`.
If `b.com` grants `a.com` to call the `GET b.com/users`, then browser will make the request.
This pre-check request is called **Preflighted request** and it is designed support **CORS** safety.

Browser check some specific response header of the OPTIONS response to check CORS.
These headers are:
- `Access-Control-Allow-Origin` what *domains* other than itself is allowed to retrieve this specific resource. 
Using `*` can open for all domains. Using `*` is not recomended due to security reason.
- `Access-Control-Allow-Methods` what *http methods* are allowed to be called. 
It is same as `Allowed` header, but it is used for CORS.
- `Access-Control-Allow-Headers` what *response headers* are allowed to be read.
- `Access-Control-Max-Age` what is the max time these allowed permissions can be cached.

For example, browser makes the following Preflighted request:
```html
OPTIONS /users HTTP/1.1
Host: b.com
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://a.com
Access-Control-Request-Method: GET
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```
and the response is the following:
```html
HTTP/1.1 204 No Content
Date: Mon, 01 Jan 2021 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: https://a.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```

### TRACE
Http method `TRACE` is used perform message loop-back test.
It is mainly used for debugging purpose.
The *loop-back test* means the caller will receive back what it has send to the server in request as response with some additional info.
If successful, the response code will be `200` with the *content-type* of `message/http`.
The final recipient is either the **origin server** or the first server to receive a *Max-Forwards* value of `0` in the request.

For this method, *request* & *response* have no body.
`TRACE` is [safe](#safe) & [idempotent](#idempotent), but not [cacheable](#cacheable).
`TRACE` is not allowed in the *HTML forms*.