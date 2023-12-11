SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

SELECT * FROM customers;
SELECT * FROM games;
SELECT * FROM rentals;
SELECT id FROM customers WHERE id=3;

TIMESTAMP DEFAULT CURRENT_TIMESTAMP