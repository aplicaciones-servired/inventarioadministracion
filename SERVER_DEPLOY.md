# Guía de Despliegue en Servidor 10.98.98.116

## 📋 Pasos para desplegar

### 1. Conectarse al servidor
```bash
ssh server@10.98.98.116
```

### 2. Crear directorio para el proyecto
```bash
mkdir -p ~/inventario-docker
cd ~/inventario-docker
```

### 3. Crear el archivo docker-compose.yml
```bash
nano docker-compose.yml
```
Copia el contenido de `server-docker-compose.yml` y pégalo allí.
Guarda con `Ctrl+X`, luego `Y`, luego `Enter`.

### 4. Iniciar los servicios
```bash
docker-compose up -d
```

### 5. Verificar que están corriendo
```bash
docker-compose ps
```

### 6. Ver logs
```bash
docker-compose logs -f
```

## 🌐 URLs de acceso

### Desde tu aplicación React Native:
- **API MinIO**: http://10.98.98.116:9000
- **MySQL (Base de datos existente)**: aplicacionesgane.cloud:5010

### Desde navegador (para administrar):
- **MinIO Console**: http://10.98.98.116:9001
  - Usuario: `admin`
  - Password: `admin123456`

## 🔐 Credenciales

### MySQL (Tu base de datos existente)
- **Host**: aplicacionesgane.cloud
- **Puerto**: 5010
- **Usuario**: md_api_user
- **Password**: L21sBZwqsW2Joe7Wj8ds
- **Tablas**: MD_IMAGENES, MD_PRODUCTOS, MD_INVENTARIO, MD_MAQUINAS

### MinIO
- **Endpoint**: http://10.98.98.116:9000
- **Access Key**: admin
- **Secret Key**: admin123456
- **Bucket**: inventario-imagenes
- **Console**: http://10.98.98.116:9001

## 📁 URLs de imágenes

Tus imágenes serán accesibles en:
```
http://10.98.98.116:9000/inventario-imagenes/productos/imagen.jpg
http://10.98.98.116:9000/inventario-imagenes/maquinas/imagen.jpg
```

## 🛠️ Comandos útiles

### Detener MinIO
```bash
docker-compose down
```

### Ver logs
```bash
docker-compose logs -f minio
```

### Reiniciar MinIO
```bash
docker-compose restart minio
```

### Ver espacio usado por volúmenes
```bash
docker system df -v
```

## 🔒 Configuración del Firewall (si es necesario)

Si el servidor tiene firewall activo, abre los puertos:
```bash
# Ubuntu/Debian
sudo ufw allow 3306/tcp
sudo ufw allow 9000/tcp
sudo ufw allow 9001/tcp

# CentOS/RHEL de MinIO:
```bash
# Ubuntu/Debian
sudo ufw allow 9000/tcp
sudo ufw allow 9001/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=9000/tcp
sudo firewall-cmd --permanent --add-port=9001/tcp
sudo firewall-cmd --reload
```

## 🔗 Arquitectura del sistema

```
┌──────────────────┐
│  React Native    │
│      App         │
└────────┬─────────┘
         │
    ┌────┴──────────────────┐
    │                       │
    ▼                       ▼
┌─────────────┐     ┌──────────────────┐
│   Backend   │────►│  MySQL Existente │
│     API     │     │ aplicacionesgane │
└──────┬──────┘     │    :5010         │
       │            │  (MD_IMAGENES,   │
       │            │   MD_PRODUCTOS)  │
       │            └──────────────────┘
       │inIO (imágenes)
```bash
docker run --rm -v inventario_minio_data:/data -v $(pwd):/backup alpine tar czf /backup/minio_backup_$(date +%Y%m%d).tar.gz /data
```

## ⚠️ Importante

1. **Cambia las contraseñas** de MinIO en producción por unas más seguras
2. El bucket `inventario-imagenes` está configurado como **público** para lectura
3. Asegúrate de que el puerto 9000 y 9001 estén accesibles desde tu red
4. Los datos de imágenes se guardan en volúmenes Docker persistentes
5. Tu base de datos MySQL ya existe en `aplicacionesgane.cloud:5010` - no se tocasword123 inventario_db > backup_$(date +%Y%m%d).sql
```

### Backup MinIO (imágenes)
```bash
docker run --rm -v inventario_minio_data:/data -v $(pwd):/backup alpine tar czf /backup/minio_backup_$(date +%Y%m%d).tar.gz /data
```

## ⚠️ Importante

1. **Cambia las contraseñas** en producción por unas más seguras
2. El bucket `inventario-imagenes` está configurado como **público** para lectura
3. Asegúrate de que el puerto 9000 y 9001 estén accesibles desde tu red
4. Los datos se guardan en volúmenes Docker persistentes
