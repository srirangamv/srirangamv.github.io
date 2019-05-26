layout: post
title: "Up & Running Flask App inside a Docker container"
name: "2019-05-26-running-flask-inside-container"
description: "2019-05-26-running-flask-inside-container"
date: 2019-05-26
---

<h2>Docker Introduction</h2>
# Installing
# Images 


# Docker helpful commands
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker image ls</p>
<p class="output">
<br>REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
<br>
</p>

<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker container ls</p>


<p class="output">
<br>CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
<br>
</p>

# Running Python inside a container
<p> </p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -it python:3 python</p>

	checks in local if python:3 image available
	if not available downloads it
	create a new container
	runs pyhton inside the container
	once done removes the container

# Running our First Python App inside a container
create application folder FirstApp
create new folder src
create app.py inside FirstApp\src folder

{% highlight python %}
//file: app.py

print('Hello World!')

{% endhighlight %}

<p>
    <figure>
      <img src="/images/firstapp_code.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption>First App</figcaption>
    </figure>    
</p> 

<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -it -v $(pwd):/First python:3 python /FirstApp/src/app.py</p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -it -v "%cd%":/First python:3 python /FirstApp/src//app.py</p>
<b>Output:</b>
<p class="output">
Hello World!
</p>

# Creating Docker image with Dockerfile

{% highlight make,shell %}
//file: Dockerfile

	# Dockerfile
	FROM python:3
	WORKDIR /src
	COPY /src .
	CMD [ "python", "app.py" ]

{% endhighlight %}

<p>
    <figure>
      <img src="/images/firstapp_code2.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption>First App</figcaption>
    </figure>    
</p> 
	
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker build -t firstpy .</p>
<b>Output:</b>
<p class="output">
<br>REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
<br>firstpy                                 latest              085903a75b6b        3 hours ago         938M
</p>

<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run firstpy</p>


Let's install Flask
add this new line to Dockerfile

RUN pip3 install Flask

{% highlight shell %}
//file: Dockerfile

	# Dockerfile
	FROM python:3
	# NEW LINE
	RUN pip3 install Flask
	WORKDIR /src
	COPY /src .
	CMD [ "python", "app.py" ]

{% endhighlight %}

also modify app.py as shown below
{% highlight python %}
//file: app.py

from flask import Flask
import os
import socket

app = Flask(__name__)

@app.route("/")
def hello():

    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)

{% endhighlight %}	

<p>
    <figure>
      <img src="/images/firstapp_flask_code.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption>First App</figcaption>
    </figure>    
</p> 

for real world apps use this line
create a new requirements.txt file

{% highlight text %}
//file: requirements.txt

	Flask

{% endhighlight %}

we can install dependencies using requirements file as shown below.
RUN pip3 install -r requirements.txt

running in detached mode.
so far interactive mode. let's run detached mode without user interaction.

<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker build -t firstpy .</p>
<p class="output">>
<br>Sending build context to Docker daemon  3.584kB
<br>Step 1/5 : FROM python:3
<br> ---> a4cc999cf2aa
<br>Step 2/5 : RUN pip3 install Flask
<br> ---> Using cache
<br> ---> e0323175dcee
<br>Step 3/5 : WORKDIR /src
<br> ---> Using cache
<br> ---> 5d3e697fe7c3
<br>Step 4/5 : COPY /src .
<br> ---> Using cache
<br> ---> d0c1dbb6056d
<br>Step 5/5 : CMD [ "python", "app.py" ]
<br> ---> Using cache
<br> ---> 085903a75b6b
<br>Successfully built 085903a75b6b
<br>SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
</p>

<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -d -p 8080:80 firstpy</p>
<p>
<p class="output">
docker: Error response from daemon: driver failed programming external connectivity on endpoint distracted_bhabha (ed515f04e2926e48c0231bc5e7bc7c6adab303c9fbc07fc342ad3ce74a2e6442): Error starting userland proxy: mkdir /port/tcp:0.0.0.0:8080:tcp:172.17.0.2:80: input/output error.
</p>

<p>
    <figure>
      <img src="/images/docker-restart.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption>First App</figcaption>
    </figure>    
</p> 

running
<p class="output">
<br>3c58c2854897756bb709aefd2ea34b3e686ab31d02e2070f8a73612ad247fe73
<br>
</p>



<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker ps</p>
<p>
<p class="output">
<br>CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                  NAMES
<br>3c58c2854897        firstpy             "python app.py"     42 seconds ago      Up 40 seconds       0.0.0.0:8080->80/tcp   eager_hamilton
<br>
</p>

<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker logs 3c58c2854897</p>
<p class="output">
<br>* Serving Flask app "app" (lazy loading)
<br>* Environment: production
<br>   WARNING: This is a development server. Do not use it in a production deployment.
<br>   Use a production WSGI server instead.
<br>* Debug mode: off
<br>* Running on http://0.0.0.0:80/ (Press CTRL+C to quit)
<br>
</p>

<p>
    <figure>
      <img src="/images/docker-output.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption>Browse the Flask App</figcaption>
    </figure>    
</p> 


<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker stop 3c58c2854897</p>
<p>