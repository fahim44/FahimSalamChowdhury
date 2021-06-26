---
title: "A.C.I.D.ity in database"
date: 2021-05-02T00:04:34+06:00
draft: false
toc: true
images:
  - "/img/lemon_slice.webp"
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
In one sentence, Atomicity means *all or nothing*.
It describes, a transaction succeeds if and only if it's all database statements are successfully executed.
If any of the statements failed, the remaining statements will not be execute & the already executed update statements (CREATE, UPDATE, DELETE operations) will be rolled-back & re-state previous state.
There is no *partial failure* in transaction.
For this property, a transaction is treated as *single unit*.

### Consistency
Consistency means data can only move from *one valid state to another valid state*.
For example, there are customer & order tables in a relational database.
Customer & Order have one-to-many relationship between them.
Meanning, a customer can have one-or-many orders, & every order has a `customer_id` field which is linked with specific customer's `id`.
Now, if we delete a customer, then this customer's order rows' `customer_id` will reference to wrong customer `id`.
So, the data will become inconsistence.
As here customer cannot move to *delete state* without clearing it's dependencies.
So we have to delete all orders of this customer; or update the customer_id references to another valid customer before deleting the customer.

If any transaction's execution violates database's consistency rule, the whole transaction will be rolled-back.

### Isolation
In database, transactions are executed in isolated space.
Isolation ensures that concurrently executed transactions leave the database in the same state as if they were executed sequentially.
Now if multiple concurrently running transactions try to mutate same data at same time, one transaction will continue while another transaction must wait until the first transaction completes.

### Durability
Durability means once a transaction is commited, the changes will be saved no matter what happened.
The future transactions can update the changes, but until then the database will always return the last updated value.
This behavior should not changed even in a situation of system failure.
To achieve this commited trasactions should be saved into *non-volatile memory*.

## Conclusion
Although *ACID* is vital requirement for databases, not all databases are succeed to achieve this.
That because, to achieve ACID compliance a databse most likely need to sacrifice other important requirements, like, speed, easy scalability etc.
To support main their focus, some databases don't give much focus on some ACID features.
Normally, relational databases (mysql, oracle etc) are ACID compliant.
On the other hand, most of the NoSQL databases (mongoDB, redis etc) lack some ACID features because they mainly focus on high speed & high availability.