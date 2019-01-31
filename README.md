# lottery-spinner

A simple lottery spinner script

### Demo
[https://securedeveloper.github.io/lottery-spinner/](https://securedeveloper.github.io/lottery-spinner/)

* Step 01
```
npm i http-serve
```
* Step 02
```
cd lottery-spinner
http-serve .
```

check address on cmd window, most of the time it is `http://127.0.0.1:8081`

browse with different URL parameters and get random lottery numbers,

Supported URL parameters are following:
* limit1
* limit2
* min1
* max1 
* min2
* max2
* timeout (Spin speed)
* joker (If you already got it from lottery, just for reference, will be stored in localStorage)

and default values are 
```
var limit1 = 6, limit2 = 0, min1 = 1, max1 = 45, min2 = 1, max2 = 0;
```

# ScreeShot
--------------

![ScreenShot](https://raw.githubusercontent.com/securedeveloper/lottery-spinner/master/assets/screenshot.png)

