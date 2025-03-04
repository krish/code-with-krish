Here’s the **assignment document** with all the required details:  

---

#  **Assignment: Extend the Microservices System**  

##  Objective
You will extend the existing **Order Service** and implement a new **Dispatcher Service** to manage vehicle allocation for order delivery. This involves:  
 **Enhancing Order Service** to support `city` and emit `order.confirmed` event.  
 **Implementing a new Dispatcher Service** for vehicle dispatch management.  
 **Using Redis for locking** to prevent multiple orders from being assigned the same vehicle.  
 **Integrating services with Kafka and Redis** for event-driven processing.  

---

## **1️ Order Service Updates**  
### 🔹 **Modify Orders Table**
- Add a new **column `city`** to the `orders` table.  
- Ensure that **clients send `city`** when creating an order.  
- Example order payload:
  ```json
  {
    "customerId": 1,
    "city": "Colombo",
    "items": [
      {
        "productId": 101,
        "price": 49.99,
        "quantity": 2
      }
    ]
  }
  ```

###  **Emit `order.confirmed` Event**  
- Once **Inventory Service processes the `order.inventory.updated` event**,  
- Save the order to the database **and publish `order.confirmed` event** to Kafka.  

---

## **2️ Implement Dispatcher Service**
###  **Create New Microservice**
- Create a **NestJS microservice** called `dispatcher-service`.  
- This service will **manage vehicle dispatch locations** and **listen for order confirmations**.

###  **Create Dispatch Locations**
- Implement a **`POST /dispatch-locations`** endpoint to register vehicles with their assigned city.  
- Example payload:
  ```json
  {
    "vehicle_number": "ABC-1234",
    "city": "Colombo"
  }
  ```
- Save this in a **MySQL database** with:
  - **`id`** (Primary Key)
  - **`vehicle_number`**
  - **`city`**

###  **Retrieve Vehicles by City**
- Implement a **`GET /dispatch-locations/:city`** endpoint.  
- Example request:
  ```bash
  curl -X GET http://localhost:3003/dispatch-locations/Colombo
  ```
- Example response:
  ```json
  [
    { "vehicle_number": "ABC-1234", "city": "Colombo" },
    { "vehicle_number": "XYZ-5678", "city": "Colombo" }
  ]
  ```

###  **Listen for `order.confirmed` Events**
- When an `order.confirmed` event is received:
  1. Retrieve **available vehicles** in the **same city as the order**.  
  2. **If no vehicle is found**, log:  
     ```plaintext
     Cannot find vehicle for order {orderNumber}
     ```
  3. **If a vehicle is found**, attempt to **acquire a Redis lock** .  
  4. **If a lock is acquired**, log:  
     ```plaintext
     Vehicle allocated for order {orderNumber}
     ```
  5. **Iterate over all vehilces If all vehicles are occupied**, log:  
     ```plaintext
     All vehicles occupied
     ```

---

## **3️ Implement Vehicle Lock Release**
###  **Create Endpoint in Dispatcher Service**
- Implement **`PATCH /dispatch-locations/:vehicle_number/release`**.  
- This will:
  1. **Clear the Redis lock** for the vehicle.  
  2. **Call the existing `PATCH /orders/:id` endpoint in Order Service** to update status to `"DELIVERED"`.  

###  **Example Request**
```bash
curl -X PATCH http://localhost:3003/dispatch-locations/ABC-1234/colombo/release
```

###  **Expected Behavior**
- **Unlocks the vehicle**, allowing new orders to use it.  
- Calls **Order Service** to mark order as `"DELIVERED"`.  

---

##  What You Need to Do
1️ Modify **Order Service** to **store `city`** and **emit `order.confirmed` event**.  
2️ Implement **Dispatcher Service**:
   - `POST /dispatch-locations` → Register vehicles.  
   - `GET /dispatch-locations/:city` → Retrieve available vehicles.  
   - **Consume `order.confirmed`** event and allocate vehicles.  
   - **Use Redis locking** to prevent double allocations.  
   - **Implement vehicle release API** (`PATCH /dispatch-locations/:vehicle_number/release`).  

---

##  Submission Requirements
-  **Push your code to a Git repository assignment directory**.  
-  **Provide API endpoints with example requests** for testing.  
-  **Include logs showing order confirmations and vehicle allocations**.  

---
