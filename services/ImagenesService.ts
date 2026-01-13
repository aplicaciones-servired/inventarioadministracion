import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://10.98.98.116:3000/api/imagenes';

export interface ImagenData {
  ID_IMAGEN: number;
  TIPO_ENTIDAD: 'INVENTARIO' | 'ARQUEO';
  ID_ENTIDAD: number;
  RUTA_IMAGEN: string;
  NOMBRE_ARCHIVO: string;
  TIPO_ARCHIVO: string;
  TAMANO_BYTES: number;
  FECHA_CARGA: string;
  LOGINREGISTRO?: string;
  url: string;
}

export class ImagenesService {
  static subirImagenDesdeUri(selectedImage: string, arg1: string, idInventario: number, arg3: string) {
      throw new Error("Method not implemented.");
  }
  
  /**
   * Subir imagen desde galería
   */
  static async subirImagen(
    tipoEntidad: 'INVENTARIO' | 'ARQUEO',
    idEntidad: number,
    loginRegistro: string,
    token: string
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      // Pedir permisos
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        return { success: false, error: 'Permiso denegado para acceder a la galería' };
      }

      // Seleccionar imagen
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (result.canceled) {
        return { success: false, error: 'Selección cancelada' };
      }

      const uri = result.assets[0].uri;
      
      // Crear FormData
      const formData = new FormData();
      formData.append('imagen', {
        uri,
        type: 'image/jpeg',
        name: `${tipoEntidad}_${idEntidad}_${Date.now()}.jpg`,
      } as any);
      formData.append('tipoEntidad', tipoEntidad);
      formData.append('idEntidad', idEntidad.toString());
      formData.append('loginRegistro', loginRegistro);

      // Subir a la API
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al subir imagen' };
      }

      return {
        success: true,
        url: data.data.url
      };

    } catch (error: any) {
      console.error('Error al subir imagen:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Tomar foto con la cámara
   */
  static async tomarFoto(
    tipoEntidad: 'INVENTARIO' | 'ARQUEO',
    idEntidad: number,
    loginRegistro: string,
    token: string
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      // Pedir permisos de cámara
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        return { success: false, error: 'Permiso denegado para acceder a la cámara' };
      }

      // Tomar foto
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (result.canceled) {
        return { success: false, error: 'Captura cancelada' };
      }

      const uri = result.assets[0].uri;
      
      // Crear FormData
      const formData = new FormData();
      formData.append('imagen', {
        uri,
        type: 'image/jpeg',
        name: `${tipoEntidad}_${idEntidad}_${Date.now()}.jpg`,
      } as any);
      formData.append('tipoEntidad', tipoEntidad);
      formData.append('idEntidad', idEntidad.toString());
      formData.append('loginRegistro', loginRegistro);

      // Subir a la API
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al subir imagen' };
      }

      return {
        success: true,
        url: data.data.url
      };

    } catch (error: any) {
      console.error('Error al tomar foto:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Obtener imágenes de una entidad
   */
  static async getImagenes(
    tipoEntidad: 'INVENTARIO' | 'ARQUEO',
    idEntidad: number,
    token: string
  ): Promise<ImagenData[]> {
    try {
      const response = await fetch(
        `${API_URL}/entidad/${tipoEntidad}/${idEntidad}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener imágenes');
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('Error al obtener imágenes:', error);
      return [];
    }
  }

  /**
   * Obtener imagen por ID
   */
  static async getImagenPorId(
    idImagen: number,
    token: string
  ): Promise<ImagenData | null> {
    try {
      const response = await fetch(`${API_URL}/${idImagen}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener imagen');
      }

      const data = await response.json();
      return data.data;

    } catch (error) {
      console.error('Error al obtener imagen:', error);
      return null;
    }
  }

  /**
   * Eliminar imagen
   */
  static async eliminarImagen(
    idImagen: number,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/${idImagen}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al eliminar imagen' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al eliminar imagen:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Eliminar todas las imágenes de una entidad
   */
  static async eliminarImagenesEntidad(
    tipoEntidad: 'INVENTARIO' | 'ARQUEO',
    idEntidad: number,
    token: string
  ): Promise<{ success: boolean; eliminadas?: number; error?: string }> {
    try {
      const response = await fetch(
        `${API_URL}/entidad/${tipoEntidad}/${idEntidad}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al eliminar imágenes' };
      }

      return {
        success: true,
        eliminadas: data.eliminadas
      };

    } catch (error: any) {
      console.error('Error al eliminar imágenes:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }
}
