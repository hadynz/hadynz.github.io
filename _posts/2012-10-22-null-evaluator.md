---
layout: post
title: "Null Evaluator"
date: 2012-10-22 -1726
categories: [snippet]
---

```csharp
public static class NullEvaluatorExtension {
    
    public static TResult Eval<T, TResult>(this T obj, Func<T, TResult> func) where T : class
    {
        return obj.Eval(func, default(TResult));
    }
    
    public static TResult Eval<T, TResult>(this T obj, Func<T, TResult> func, TResult defaultValue) where T : class
    {
        return obj == null ? defaultValue : func(obj);
    }
}
```