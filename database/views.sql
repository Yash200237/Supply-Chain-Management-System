--TrackDelivery View
CREATE OR REPLACE VIEW TrackDelivery AS
SELECT 
    o.date AS `Purchased Date`, 
    r.path_description AS `Route`, 
    GROUP_CONCAT(p.name ORDER BY p.name ASC SEPARATOR ', ') AS `Products`,
    s.status AS `Status`,
    o.customer_ID,
    FORMAT(SUM((p.price - (p.price * p.discount / 100)) * op.quantity), 2) AS `Total Price`  -- Format to 2 decimal places
FROM `order` o
JOIN route r ON o.route_ID = r.route_ID
JOIN orderstatus s ON s.status_ID = o.status_ID
JOIN orderproduct op ON o.order_ID = op.order_id
JOIN product p ON p.product_ID = op.product_id
GROUP BY o.order_ID;

------------------------------------------------------------------------------------------------

--CustomerDetails
CREATE OR REPLACE VIEW CustomerDetails AS
SELECT 
	first_name as `First Name`,
    customer_ID,
    CONCAT(first_name, ' ', last_name) AS `Full Name`, 
    email AS `Email`, 
    phone_number AS `Phone Number`, 
    address AS `Address`,
    city AS `City`,
    password
FROM customer; 

------------------------------------------------------------------------------------------------

CREATE OR REPLACE VIEW RouteSpecificSales AS
SELECT 
    o.route_ID,
    r.path_description,
    p.name,
    SUM(op.quantity) AS total_quantity_sold,
    YEAR(o.date) AS year,
    MONTH(o.date) AS month, -- Include month to support month-based filtering
    s.store_ID
FROM `Order` o
JOIN OrderProduct op ON o.order_ID = op.order_ID
JOIN Product p ON op.product_ID = p.product_ID
JOIN Route r ON o.route_ID = r.route_ID
JOIN Store s ON r.store_ID = s.store_ID
GROUP BY o.route_ID, r.path_description, p.name, year, month, s.store_ID;

------------------------------------------------------------------------------------------------


CREATE VIEW CustomerOrders AS
SELECT 
    o.customer_ID,
    p.product_ID,
    p.name AS product_name,
    SUM(op.quantity) AS total_quantity_ordered
FROM OrderProduct op
JOIN Product p ON op.product_ID = p.product_ID
JOIN `Order` o ON op.order_ID = o.order_ID
GROUP BY o.customer_ID, p.product_ID, p.name;

------------------------------------------------------------------------------------------------


CREATE VIEW ProductCustomersInCity AS
SELECT DISTINCT 
    op.product_ID,
    c.customer_ID,
    c.first_name,
    c.last_name,
    m.manager_ID
FROM OrderProduct op
JOIN Product p ON op.product_ID = p.product_ID
JOIN `Order` o ON op.order_ID = o.order_ID
JOIN Customer c ON o.customer_ID = c.customer_ID
JOIN Route r ON o.route_ID = r.route_ID
JOIN Manager m ON r.store_ID = m.store_ID;