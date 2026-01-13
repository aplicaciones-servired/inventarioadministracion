const API_URL = 'http://10.98.98.116:3000/api';

export interface Inventario {
  ID_INVENTARIO: number;
  ID_PRODUCTO: number;
  ID_LOTE: number;
  ID_UBICACION: number;
  CANTIDAD_ACTUAL: number;
  FECHA_ACTUALIZACION: string;
}

export interface InventarioDetallado extends Inventario {
  CODIGO_PRODUCTO: string;
  NOMBRE_PRODUCTO: string;
  TIPO_PRODUCTO: 'ALIMENTO' | 'TANGIBLE';
}

export class InventarioService {
  
  /**
   * Obtener inventario
   */
  static async getInventario(
    token: string,
    filtros?: {
      idProducto?: number;
      idUbicacion?: number;
      idLote?: number;
    }
  ): Promise<Inventario[]> {
    try {
      let url = `${API_URL}/inventario?`;
      
      if (filtros?.idProducto) url += `idProducto=${filtros.idProducto}&`;
      if (filtros?.idUbicacion) url += `idUbicacion=${filtros.idUbicacion}&`;
      if (filtros?.idLote) url += `idLote=${filtros.idLote}&`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener inventario');
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('Error al obtener inventario:', error);
      return [];
    }
  }

  /**
   * Obtener inventario detallado con información de productos
   */
  static async getInventarioDetallado(
    token: string,
    filtros?: {
      idProducto?: number;
      idUbicacion?: number;
    }
  ): Promise<InventarioDetallado[]> {
    try {
      let url = `${API_URL}/inventario/detallado?`;
      
      if (filtros?.idProducto) url += `idProducto=${filtros.idProducto}&`;
      if (filtros?.idUbicacion) url += `idUbicacion=${filtros.idUbicacion}&`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener inventario detallado');
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('Error al obtener inventario detallado:', error);
      return [];
    }
  }

  /**
   * Obtener inventario por ID
   */
  static async getInventarioPorId(
    id: number,
    token: string
  ): Promise<InventarioDetallado | null> {
    try {
      const response = await fetch(`${API_URL}/inventario/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener inventario');
      }

      const data = await response.json();
      return data.data;

    } catch (error) {
      console.error('Error al obtener inventario:', error);
      return null;
    }
  }

  /**
   * Crear registro de inventario
   */
  static async crearInventario(
    inventario: {
      idProducto: number;
      idLote: number;
      idUbicacion: number;
      cantidadActual: number;
    },
    token: string
  ): Promise<{ success: boolean; idInventario?: number; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/inventario`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventario),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al crear inventario' };
      }

      return {
        success: true,
        idInventario: data.data.idInventario
      };

    } catch (error: any) {
      console.error('Error al crear inventario:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Actualizar inventario
   */
  static async actualizarInventario(
    id: number,
    inventario: Partial<{
      cantidadActual: number;
      idLote: number;
      idUbicacion: number;
    }>,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/inventario/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventario),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al actualizar inventario' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al actualizar inventario:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Ajustar cantidad de inventario (entrada/salida)
   */
  static async ajustarInventario(
    id: number,
    ajuste: {
      cantidad: number;
      tipo: 'ENTRADA' | 'SALIDA';
    },
    token: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/inventario/${id}/ajustar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ajuste),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al ajustar inventario' };
      }

      return { success: true, data: data.data };

    } catch (error: any) {
      console.error('Error al ajustar inventario:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Eliminar inventario
   */
  static async eliminarInventario(
    id: number,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/inventario/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al eliminar inventario' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al eliminar inventario:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Obtener resumen de inventario por producto
   */
  static async getResumenPorProducto(
    token: string
  ): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/inventario/resumen/productos`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener resumen');
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('Error al obtener resumen:', error);
      return [];
    }
  }
}
