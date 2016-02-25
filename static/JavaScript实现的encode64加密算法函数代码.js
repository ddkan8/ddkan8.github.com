// JavaScript实现的encode64加密算法函数代码，效率不错

// encode64编解码
(function() {
    var codeChar = "PaAwO65goUf7IK2vi9-xq8cFTEXLCDY1Hd3tV0ryzjbpN_BlnSs4mGRkQWMZJeuh";
    window.encode64 = function(str) {
        var s = "";
        var a = strToBytes(str); //取得字串的字节数组, 数组长度是字串长度的2倍.
        var res = a.length % 3; //3个字节一组进行处理, 余下特殊处理
        var i = 2, v;
        for (; i < a.length; i += 3) {//每3个字节用4个字符表示, 相当于3个字符(实际上是6个字节)用8个字符编码(实际为16个字节), 看起来容量膨胀了很多, 但是在启用压缩的情况下, 这些又被抵消掉了.
            v = a[i - 2] + (a[i - 1] << 8) + (a[i] << 16);
            s += codeChar.charAt(v & 0x3f);
            s += codeChar.charAt((v >> 6) & 0x3f);
            s += codeChar.charAt((v >> 12) & 0x3f);
            s += codeChar.charAt((v >> 18));
        }
        if (res == 1) {//字节余一位时候, 补2个字符, 64*64>256
            v = a[i - 2];
            s += codeChar.charAt(v & 0x3f);
            s += codeChar.charAt((v >> 6) & 0x3f);
        } else if (res == 2) {//字节余2位的时候, 补3个字节, 64*64*64>256*256, 所以是可行的.
            v = a[i - 2] + (a[i - 1] << 8);
            s += codeChar.charAt(v & 0x3f);
            s += codeChar.charAt((v >> 6) & 0x3f);
            s += codeChar.charAt((v >> 12) & 0x3f);
        }
        return s;
    };
    window.decode64 = function(codeStr) {
        var dic = [];
        for (var i = 0; i < codeChar.length; i++) {
            dic[codeChar.charAt(i)] = i;
        }
        var code = [];
        var res = codeStr.length % 4;
        var i = 3, v;
        for (; i < codeStr.length; i += 4) {
            v = dic[codeStr.charAt(i - 3)];
            v += dic[codeStr.charAt(i - 2)] << 6;
            v += dic[codeStr.charAt(i - 1)] << 12;
            v += dic[codeStr.charAt(i)] << 18;
            code.push(v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff);
        }
        if (res == 2) {//正确的字节数肯定是余2或3, 没有1的情况, 如果出现, 舍弃.
            v = dic[codeStr.charAt(i - 3)];
            v += dic[codeStr.charAt(i - 2)] << 6;
            code.push(v & 0xff);
        } else if (res == 3) {
            v = dic[codeStr.charAt(i - 3)];
            v += dic[codeStr.charAt(i - 2)] << 6;
            v += dic[codeStr.charAt(i - 1)] << 12;
            code.push(v & 0xff, (v >> 8) & 0xff);
        }
        return strFromBytes(code);
    };
})();