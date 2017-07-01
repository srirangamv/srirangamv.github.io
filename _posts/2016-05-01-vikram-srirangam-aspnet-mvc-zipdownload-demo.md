---
layout: post
title: "Asp.Net MVC, Generate Zip file entirely from memory."
name: "2016-05-01-vikram-srirangam-aspnet-mvc-zipdownload-demo"
description: "Asp.Net MVC, Generate Zip file as an attachment entirely from memory."
date: 2016-05-01
---

<p>Using .Net's new IO compression library, we can now create Zip file and sent over netwok entirely from memory without the need of saving files temporarily on file system. See below code for sending Zip file as a result for an  Asp.Net MVC action.</p>


{% highlight csharp %}
using System.IO;
using System.IO.Compression;

public FileContentResult GetZip()
{
    byte[] supposedtobelargeText = Encoding.UTF8.GetBytes("Vikram");

    using (MemoryStream memoryZipStream = new MemoryStream())
    {
        using(ZipArchive zipArchive=new ZipArchive(memoryZipStream, ZipArchiveMode.Create, true))
        {
            ZipArchiveEntry zipEntry = zipArchive.CreateEntry("Names.txt", CompressionLevel.Optimal);

            using (Stream zipEntryStream=zipEntry.Open())
            {
                using(var contentStream = new MemoryStream(supposedtobelargeText))
                {                            
                    contentStream.CopyTo(zipEntryStream);
                    zipEntryStream.Flush();
                }                        
            }                    
        }

        memoryZipStream.Seek(0, SeekOrigin.Begin);
        return File(memoryZipStream.GetBuffer(), "application/zip", "test.zip");
    }   
}
{% endhighlight %}