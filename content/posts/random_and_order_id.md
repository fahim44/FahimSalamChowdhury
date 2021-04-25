---
title: "Random number & orderId"
date: 2021-01-13T20:12:01+06:00
draft: true
toc: true
images:
tags:
  - random-number
  - web-service
---

E-commerce service is the new hot trend. 
People love to shop online. 
Again, the pendemic lockdown takes the e-commerce businesses to another level. 
Rumor has, Amazon has ~35 orders per seconds! 
When you place an order in Amazon, you are given an 19 digit order number in split of seconds. 
This number is used to indentify the order, track the order, deliver the order etc. 
So besically, this number is very important. 
It also should be unique; because you don't want to mismatch your order with another person's order, right?
Have you ever wonder, how the big companies like **Amazon** & **Daraaz** generate this numbers? 
I don't know exactly, they don't share this because of security purpose. 
But we can assume the generation process.
Today we will discuss some of these process.

## Requirements
There are some requirements which should be fulfiled when generating order ids.

- All characters should be digit. 
If we use alpha-numeric order ids, customers will have hard time to use them (for example: share with the customer-care agent, or type to track order; this will be more error-prone.)

- The length should be *>9* & *<20*. 
There is no official standard about the length, but it is always better to have a fixed length id.
The id can be devided into smaller parts placing (`-`) between them.
One of the common format is `4-6-4`.

- Id must be unique.
As discussed earlier, we don't want same id for multiple orders.

- Id generation must be random.
We don't want to use sequencial numbers, because then anybody can guess the next id; even worse can guess how many orders are being processed in our system till now.

## Solutions
There are several solutions of generating order ids. 
We will discuss these solutions and their pros & cons.

