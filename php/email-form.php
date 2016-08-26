<?php

/* Naming Convention:
ClassName
methodName
propertyName
function_name (meant for global functions)
$variable_name*/

$first_name = $_POST['contacts-name'];
$email = $_POST['contacts-email'];
$telephone = $_POST['contacts-phone'];
$msg = $_POST['contacts-content'];
//  . \n\r . 'За обратна връзка:' . \n\r . 'Е-майл: ' . $email . \n\r . 'Телефон: ' . $telephone;
$msg = wordwrap($msg, 70);
$to = 'ufo.terziev@gmail.com';
$subject = 'Ново "Галиция" съобщение';
// $header = 'From: ' . $first_name;

mail ($to, $subject, $msg);
echo 'Message sent!';
?>