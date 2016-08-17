@ECHO OFF

SET "ModuleName=%1%"

CALL npm install %ModuleName% --save

CALL typings install dt~%ModuleName% --global --save



