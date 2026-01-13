import { ImagenesService } from './ImagenesService';

const API_URL = 'http://10.98.98.116:3000/api';

export interface Producto {
  ID_PRODUCTO: number;
  CODIGO: string;
  NOMBRE: string;
  TIPO_PRODUCTO: 'ALIMENTO' | 'TANGIBLE';
  MANEJA_VENCIMIENTO: boolean;
  ESTADO: boolean;
  FECHA_CREACION: string;
}

export interface ProductoConImagen extends Producto {
  imagenUrl?: string;
}

export class ProductosService {
  
  /**
   * Obtener todos los productos
   */
  static async getProductos(
    token: string,
    estado?: boolean,
    tipo?: 'ALIMENTO' | 'TANGIBLE'
  ): Promise<ProductoConImagen[]> {
    try {
      let url = `${API_URL}/productos?`;
      if (estado !== undefined) url += `estado=${estado}&`;
      if (tipo) url += `tipo=${tipo}&`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }

      const data = await response.json();
      
      // Obtener imagen de cada producto
      const productosConImagenes = await Promise.all(
        data.data.map(async (producto: Producto) => {
          const imagenes = await ImagenesService.getImagenes(
            'INVENTARIO',
            producto.ID_PRODUCTO,
            token
          );
          return {
            ...producto,
            imagenUrl: imagenes.length > 0 ? imagenes[0].url : undefined
          };
        })
      );

      return productosConImagenes;

    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  }

  /**
   * Obtener producto por ID con su imagen
   */
  static async getProductoPorId(
    id: number,
    token: string
  ): Promise<ProductoConImagen | null> {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener producto');
      }

      const data = await response.json();
      
      // Obtener imágenes
      const imagenes = await ImagenesService.getImagenes(
        'INVENTARIO',
        id,
        token
      );

      return {
        ...data.data,
        imagenUrl: imagenes.length > 0 ? imagenes[0].url : undefined
      };

    } catch (error) {
      console.error('Error al obtener producto:', error);
      return null;
    }
  }

  /**
   * Crear producto
   */
  static async crearProducto(
    producto: {
      codigo: string;
      nombre: string;
      tipoProducto: 'ALIMENTO' | 'TANGIBLE';
      manejaVencimiento?: boolean;
      estado?: boolean;
    },
    token: string
  ): Promise<{ success: boolean; idProducto?: number; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al crear producto' };
      }

      return {
        success: true,
        idProducto: data.data.idProducto
      };

    } catch (error: any) {
      console.error('Error al crear producto:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Actualizar producto
   */
  static async actualizarProducto(
    id: number,
    producto: Partial<{
      codigo: string;
      nombre: string;
      tipoProducto: 'ALIMENTO' | 'TANGIBLE';
      manejaVencimiento: boolean;
      estado: boolean;
    }>,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al actualizar producto' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al actualizar producto:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Eliminar producto (soft delete)
   */
  static async eliminarProducto(
    id: number,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al eliminar producto' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al eliminar producto:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Buscar productos
   */
  static async buscarProductos(
    query: string,
    token: string
  ): Promise<Producto[]> {
    try {
      const response = await fetch(
        `${API_URL}/productos/buscar?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('Error al buscar productos:', error);
      return [];
    }
  }
}
