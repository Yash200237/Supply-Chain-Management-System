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