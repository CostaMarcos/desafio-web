## Para rodar a aplicação backend

- Instalar o virtualenv
    - pip install virtualenv

- Criar um ambiente virtual
    - Executar o comando virtualenv venv

- Entrando no ambiente virtual
    - Executar o comando source venv/bin/activate

- Instalar pacotes do projeto
    - Executar o comando pip install -r requirements.txt

- Configurar as strings de conexão no arquivo .env que fica dentro da pasta task-manager

- Rodar as migrations
    - python manage.py migrate

- Rodar a aplicação
    - python manage.py runserver