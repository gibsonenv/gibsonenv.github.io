from flask import Flask
from flask import request
import subprocess


app = Flask(__name__)
processes = []

def launch_gibson():
    proc = subprocess.Popen(["bash", "launch.sh"], shell=False)
    return proc

@app.route("/", methods=['GET', 'POST'])
def hello():
    global processes
    if request.method == 'POST':

        #print(request.form)
        if request.form["action"] == u"run":

            proc = launch_gibson()
            processes.append(proc)

        elif request.form['action'] == u"kill":

            from IPython import embed; embed()
            #for proc in processes:
            #    print(proc)
                #proc.terminate()
                #processes = []
    return '''
    <form action = "" method = "post">
        <input type="submit" name="action" value="run" />
        <input type="submit" name="action" value="kill" />
    </form>
    '''



if __name__ == "__main__":
    app.run()
