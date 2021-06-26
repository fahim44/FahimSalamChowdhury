---
title: "Theorem of C.A.P"
date: 2021-06-25T22:10:08+06:00
draft: false
toc: true
images:
  - "/img/cap.webp"
tags:
  - database
---

The **CAP** (*consistency*, *availability*, *partition tolerance*) theorem is also known as *Brewer’s Theorem* which is named after
{{< newTabLinkExternal link="https://en.wikipedia.org/wiki/Eric_Brewer_(scientist)" text="computer scientist Professor Eric A. Brewer" >}}.
It is a theorem regarding **Distributed Database System** first advanced by Professor Brewer during a talk on distributed system in 2000.\
Before jumping to the actual theorem, start first check out some key words.

## Distributed system
In basic terms, A distributed system is a *network* of multiple nodes which work as a single node.
Here node is physical or virtual machines.\
*Microservice* architecture is a good example of distributed system.
Here separate machines & applications works together which seems like a single entity to end-user.
This applications can be horizontally scalable accross multiple machines.
They have independent states & operate conurrently. They communicate with each other using various messeging protocols.
They can also fail independently without taking down the whole network it.

*Distributed database system* stores data on more than one database node at the same time.
When we work with billions of data with "*available everywhere*" mentality, we need to consider the distributed system.\
Basically, all clouds applications are distributed system.

## Consistency
Consistency means, end-users retrieve same data at a same time, no matter witch node they are connect to.
To achieve this fully, when data is written to any node, it must be replicated to others nodes right away & they retrieval of the data should be unavailable until all nodes write the data.\
Please note that, ***This consistency & Consistency property of ACID don't provide same meaning.***

## Availability
Availability means, when an end-user requested any data, he will receive response; even if one or more nodes are down.
All active nodes should return valid response.

## Partition tolerance
Any distributed system's backbone is communication process.
Partition tolerance means, whole sytem should keep working dispite any number of communication breakdowns happend.

{{< image src="/img/cap.webp" alt="cap" position="center" style="border-radius: 8px;" >}}

## CAP theorem
In CAP theorem, Brewer states that; for a *distributed data store*, it is impossible to simultaneously provide more two out of three (*Consistency*, *Availability*, *Partition tolerance*) guarantees.\
For example, a distributed database can fully support consistency, availability; but will fail to gurantee full partition tolerance gurantee.

A database which gurantee consistency and availability is called **CA database**.
For example, mongoDB, redis

A database which gurantee consistency and partition tolerance is called **CP database**.
For example, mysql.

A database which gurantee availability and partition tolerance is called **AP database**.
For example, cassandra, couchDB.
Cassandra called itself eventually consistent, because it can be configured to become CA instead of AP and vice-versa.

Please note that, these databases have all three features, but can only fully support maxium any two of them.