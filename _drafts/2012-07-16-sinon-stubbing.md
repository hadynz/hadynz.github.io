---
layout: posts
title: Object Eval Extension
date: 2012-10-22 -1726
categories: ['blog']
tags: ['code gem']
comments: true
meta: true
quote:
    text: Every extension of knowledge arises from making the conscious the unconscious.
    author: Friedrich Nietzsche
---
var stub = sinon.stub(XERO.util.Dom, 'get_data').returns(dummyData.formData);
    /*
    XERO.util.Dom.get_data = function() {
        return dummyData.formData;
    };
    */
    
    
    stub.restore();