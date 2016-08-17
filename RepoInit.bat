@ECHO OFF

SET "MochaTestFolderName=test"

IF EXIST package.json del package.json

CALL npm init
IF /I "%ERRORLEVEL%" NEQ "0" (
	ECHO Could Not Find Node.js!
)

CALL typings init
IF /I "%ERRORLEVEL%" NEQ "0" (
	CALL npm install -g typings 
	CALL typings --init
)

REM CALL eslint --init
REM IF /I "%ERRORLEVEL%" NEQ "0" (
	REM CALL npm install -g eslint 
	REM CALL eslint --init
REM )

CALL InstallModule.bat mocha

CALL InstallModule.bat chai

CALL InstallModule.bat jsdom

CALL InstallModule.bat jquery

IF EXIST %MochaTestFolderName% RMDIR %MochaTestFolderName%

MKDIR %MochaTestFolderName%

CALL mocha
IF /I "%ERRORLEVEL%" NEQ "0" (
	CALL npm install -g mocha 
	CALL mocha
)



