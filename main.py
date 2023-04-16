import requests
import time


  

response= requests.get("https://disneyapi.dev/docs/")

if response.status_code == 200:
    data = response.json
    print(data)
    print ("ENTRE CORRECTAMENTE")
else:

    print("Error al hacer la solicitud:", response.status_code)


# Función para hacer una llamada a la API
def make_api_call():
    response = requests.get("https://api.disneyapi.dev/character")
    return response.status_code

# Cronjob para ejecutar la función cada 5 segundos
for i in range(200):
    status_code = make_api_call()
    print(f"Status code: {status_code}")
    if status_code != 200:
        print("API not responding, retrying in 5 seconds...")
        time.sleep(5)
    else:
        time.sleep(5)

