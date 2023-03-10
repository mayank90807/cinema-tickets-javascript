# Purpose

This is a coding exercise which was submitted to Department of Works and Pensions as part of hiring stage of coding test.


# Usage

    git clone https://github.com/mayank90807/cinema-tickets-javascript
    cd node-express-mongoose
    npm install
    cp .env.example .env
    npm start



# Project Structure

```
src\pairtest
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--libs\          # Utility classes and functions
 |--validations\    # Request data validation schemas

 
src\thirdparty
 |--seatbooking\    # SeatReservationService` an external provider with no defects
 |--paymentgateway\ # TicketPaymentService` an external provider with no defects
 
src/
 |--app.js          # Express app
 |--index.js        # App entry point
```

# API Endpoints
To  view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/docs` in your browser

List of available routes:

**Auth routes**:\
`POST /purchase/tickets` - purchase tickets


**Health check**:\
`get /health-check` - check if api is working


The swagger docs is used to provide documentation and will look something like this: 

![](https://i.imgur.com/SMq9yem.png)

# Objective

This is a coding exercise which will allow you to demonstrate how you code and your approach to a given problem. 

You will be assessed on: 
- Your ability to write clean, well-tested and reusable code.
- How you have ensured the following business rules are correctly met.

# Business Rules

- There are 3 types of tickets i.e. Infant, Child, and Adult.
- The ticket prices are based on the type of ticket (see table below).
- The ticket purchaser declares how many and what type of tickets they want to buy.
- Multiple tickets can be purchased at any given time.
- Only a maximum of 20 tickets that can be purchased at a time.
- Infants do not pay for a ticket and are not allocated a seat. They will be sitting on an Adult's lap.
- Child and Infant tickets cannot be purchased without purchasing an Adult ticket.

|   Ticket Type    |     Price   |
| ---------------- | ----------- |
|    INFANT        |    £0       |
|    CHILD         |    £10      |
|    ADULT         |    £20      |

- There is an existing `TicketPaymentService` responsible for taking payments.
- There is an existing `SeatReservationService` responsible for reserving seats.

## Constraints

- The JavaScript code in the `thirdparty` folder CANNOT be modified.
- The `TicketTypeRequest` SHOULD be an immutable object.

## Assumptions

You can assume:
- All accounts with an id greater than zero are valid. They also have sufficient funds to pay for any no of tickets.
- The `TicketPaymentService` implementation is an external provider with no defects. You do not need to worry about how the actual payment happens.
- The payment will always go through once a payment request has been made to the `TicketPaymentService`.
- The `SeatReservationService` implementation is an external provider with no defects. You do not need to worry about how the seat reservation algorithm works.
- The seat will always be reserved once a reservation request has been made to the `SeatReservationService`.

## Task

Provide a working implementation of a `TicketService` that:
- Considers the above objective, business rules, constraints & assumptions.
- Calculates the correct amount for the requested tickets and makes a payment request to the `TicketPaymentService`.  
- Calculates the correct no of seats to reserve and makes a seat reservation request to the `SeatReservationService`.  
- Rejects any invalid ticket purchase requests. It is up to you to identify what should be deemed as an invalid purchase request.


## Inspirations

- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)