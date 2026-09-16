ALTER TABLE `users`
  ADD COLUMN `notification_email` VARCHAR(255) NULL AFTER `password_hash`,
  ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`;

UPDATE `users`
SET `notification_email` = `email`
WHERE `notification_email` IS NULL;

UPDATE `users` u
LEFT JOIN `settings` s ON s.`setting_key` = 'admin_email'
SET u.`notification_email` = COALESCE(s.`setting_value`, u.`email`)
WHERE u.`id` = 1;
