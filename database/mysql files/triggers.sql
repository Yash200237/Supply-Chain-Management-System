DELIMITER //

-- Trigger for setting status_ID to 3 when schedule status changes to 'on progress'
CREATE TRIGGER UpdateOrderStatusOnProgress
AFTER UPDATE ON TruckSchedule
FOR EACH ROW
BEGIN
    IF NEW.status = 'on progress' THEN
        UPDATE `Order`
        SET status_ID = 3
        WHERE schedule_ID = NEW.schedule_ID;
    END IF;
END //


-- Trigger for setting status_ID to 4 when schedule status changes to 'completed'
CREATE TRIGGER UpdateOrderStatusOnCompleted
AFTER UPDATE ON TruckSchedule
FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' THEN
        UPDATE `Order`
        SET status_ID = 4
        WHERE schedule_ID = NEW.schedule_ID;
    END IF;
END //

DELIMITER ;
