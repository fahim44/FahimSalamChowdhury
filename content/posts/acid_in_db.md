---
title: "A.C.I.D.ity in database"
date: 2021-04-26T00:04:34+06:00
draft: true
toc: true
images:
tags:
  - database
---

**A**tomicity, **C**onsistency, **I**solation, **D**urability (aka: **ACID**) are the properties of [*database transactions*](#transaction).
These properties describe the data validity of any condition.

## Transaction
Database Transaction means single or multiple related database operations executing sequencially which is counted as a single database unit; which guarantees data durability, consistency.
For example, on any e-commerance website, if you place an order, an row is created against your account in order table, the available item count decrease for the ordered item from the item.
These two operations can be wrap around with transaction.
The operations will be completed sequentially (in this example, first order will be created, then item count will be decreased).
The transaction is completed when all operations completed successfully.
If any operation for example *decrease item count* failed, all operations should be rolledback, meaning *create order* also be canceled.

## ACID
*ACID* are the properties what make [transaction](#transaction) successful.
Let's discuss them one-by-one.

{{< image src="/img/lemon_slice.webp" alt="acid" position="center" style="border-radius: 8px;" >}}

### Atomicity
In one sentence, Atomicity means *"all or nothing"*.
It describes, a transaction succeeds if and only if it's all database statements succeed.
If any of the statements failed, the remaining statements will not be execute & the already executed update statements (CREATE, UPDATE, DELETE operations) will be roll-backed & re-state previous state.
There is no *partial failure* in transaction.
For this property, a transaction is treated as *single unit*.