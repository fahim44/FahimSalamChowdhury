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

- ### Safe
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

- ### Idempotent
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

- ### Cacheable
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

- ### GET
The `GET` methods requests to **read** any specified resource.
GET should only be used to retrieve data.
Data is passed to the caller as the response body.
GET is [safe](#safe), [idempotent](#idempotent), [cacheable](#cacheable).
GET is also allowed in the *HTML forms*.

Althouth there is no prohibition from the specification, Some existing implementation may not support sending body/payload in the GET request.
So, it is better not to send payload in the GET request.

### POST

### PUT

### DELETE

### PATCH

- ### HEAD
Same as [`GET`](#get), `HEAD` http method requests to **read** specific resource.
The differece between these two is `GET` is interested in actual data, where `HEAD` is interested on *status of the data*. 

HEAD method requests for [HTTP HEADERS](#http-headers).
HEAD method doesn't support data passing via request/response body.
HEAD is [safe](#safe), [idempotent](#idempotent), [cacheable](#cacheable).
HEAD is not allowed in the *HTML forms*.

For example, an HEAD request url makes a request for large download. 
Instead of actually downloading the data, HEAD request could read its `Content-Length` header to check the filesize without actually downloading the file.

- #### HTTP HEADERS
`HEADERS` let the client & server pass additional informatiion with an HTTP request or response.
A header passes data in *key-value* pair syntax, having `:` between them as separator.
A header dosen't hold actual data, but information of the data.
There are various types of headers, for example, *General headers*, *Request headers*, *Response headers*, *Entity headers*.

### CONNECT

### OPTIONS

### TRACE