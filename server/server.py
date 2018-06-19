from flask import Flask, render_template, send_from_directory
from flask import request
import subprocess
import psutil
import os


app = Flask(__name__)
processes = []

dataset_root = '/home/fei/Development/GibsonEnv/gibson/assets/dataset'


def launch_gibson():
    proc = subprocess.Popen(["bash", "launch.sh"], shell=False)
    return proc

def kill_proc_with_child(proc_pid):
    process = psutil.Process(proc_pid)
    for proc in process.children(recursive=True):
        proc.kill()
    process.kill()

def compose_yaml(form):
    agent = form['agent']
    space = form['env']
    with open(os.path.join(dataset_root, space, 'camera_poses.csv')) as f:
        ls = f.readline().strip().split(',')

    pos = ls[1:4]
    pos = [float(item) for item in pos]
    #print(pos)
    #return

    yaml = """
envname: {0}NavigateEnv
model_id: {1}
target_orn: [0, 0, 1.57]
target_pos: [-14.3, 45.07, 0.5]
initial_orn: [0, 0, 4.71]
initial_pos: [{2}, {3}, {4}]
fov: 1.57
is_discrete: true

use_filler: true
display_ui: true
show_diagnostics: true
ui_num: 2
ui_components: [RGB_FILLED, DEPTH]
random:
  random_initial_pose : false
  random_target_pose : false
  random_init_x_range: [-0.1, 0.1]
  random_init_y_range: [-0.1, 0.1]
  random_init_z_range: [-0.1, 0.1]
  random_init_rot_range: [-0.1, 0.1]
  random_target_range: 0.1

output: [nonviz_sensor, rgb_filled, depth]
resolution: 256

speed:
  timestep: 0.01
  frameskip: 1

mode: gui #gui|headless
verbose: false
""".format(agent, space, pos[0], pos[1], pos[2])
    return yaml


def compose_python(form):
    agent = form['agent']
    space = form['env']

    python_str="""    
from gibson.envs.mobile_robots_env import TurtlebotNavigateEnv
from gibson.envs.husky_env import HuskyNavigateEnv
from gibson.envs.ant_env import AntNavigateEnv
from gibson.utils.play import play
import os
config_file = 'demo.yaml'
env = {}NavigateEnv(config = config_file)
play(env, zoom=4)    
""".format(agent)
    return python_str


modalities = ['normal', 'depth', 'semantics', 'rgb']
resolution = [256, 512]


def assert_modality(form):
    for m in modalities:
        if m in form.keys() and form[m] == 'on': return True
    return False

def assert_resolution(form):
    for r in resolution:
        if r in form.keys() and form[r] == 'on': return True
    return False

@app.route("/", methods=['GET', 'POST'])
def hello():
    global processes
    if request.method == 'POST':

        print(request.form)
        if not assert_resolution(request.form) or not assert_modality(request.form):
            return render_template('index_demo.html')

        if request.form["action"] == u"run":
            print(request.form)

            yaml_str = compose_yaml(request.form)
            with open('demo.yaml', 'w') as f:
                f.write(yaml_str)

            python_str = compose_python(request.form)
            with open('demo.py', 'w') as f:
                f.write(python_str)


            proc = launch_gibson()
            processes.append(proc)

        elif request.form['action'] == u"kill":

            #from IPython import embed; embed()
            for proc in processes:
                kill_proc_with_child(proc.pid)
            #    print(proc)
                #proc.terminate()
                processes = []
    

    return render_template('index_demo.html')


@app.route('/public/<path:path>')
def send_static(path):
    return send_from_directory('public', path)


if __name__ == "__main__":
    app.run()
