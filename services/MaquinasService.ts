import { ImagenesService } from './ImagenesService';

const API_URL = 'http://10.98.98.116:3000/api';

export interface Maquina {
  ID_MAQUINA: number;
  CODIGO: string;
  NOMBRE: string;
  ESTADO: 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO';
  FECHA_COMPRA?: string;
  FECHA_INICIO_OPERACION?: string;
  UBICACION?: string;
  OBSERVACIONES?: string;
  FECHA_CREACION: string;
}

export interface MaquinaConImagen extends Maquina {
  imagenUrl?: string;
}

export class MaquinasService {
  
  /**
   * Obtener todas las máquinas
   */
  static async getMaquinas(
    token: string,
    estado?: 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO'
  ): Promise<MaquinaConImagen[]> {
    try {
      let url = `${API_URL}/maquinas`;
      if (estado) url += `?estado=${estado}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener máquinas');
      }

      const data = await response.json();
      
      // Obtener imagen de cada máquina
      const maquinasConImagenes = await Promise.all(
        data.data.map(async (maquina: Maquina) => {
          const imagenes = await ImagenesService.getImagenes(
            'ARQUEO',
            maquina.ID_MAQUINA,
            token
          );
          return {
            ...maquina,
            imagenUrl: imagenes.length > 0 ? imagenes[0].url : undefined
          };
        })
      );

      return maquinasConImagenes;

    } catch (error) {
      console.error('Error al obtener máquinas:', error);
      return [];
    }
  }

  /**
   * Obtener máquina por ID con su imagen
   */
  static async getMaquinaPorId(
    id: number,
    token: string
  ): Promise<MaquinaConImagen | null> {
    try {
      const response = await fetch(`${API_URL}/maquinas/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener máquina');
      }

      const data = await response.json();
      
      // Obtener imágenes
      const imagenes = await ImagenesService.getImagenes(
        'ARQUEO',
        id,
        token
      );

      return {
        ...data.data,
        imagenUrl: imagenes.length > 0 ? imagenes[0].url : undefined
      };

    } catch (error) {
      console.error('Error al obtener máquina:', error);
      return null;
    }
  }

  /**
   * Crear máquina
   */
  static async crearMaquina(
    maquina: {
      codigo: string;
      nombre: string;
      estado: 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO';
      fechaCompra?: string;
      fechaInicioOperacion?: string;
      ubicacion?: string;
      observaciones?: string;
    },
    token: string
  ): Promise<{ success: boolean; idMaquina?: number; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/maquinas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maquina),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al crear máquina' };
      }

      return {
        success: true,
        idMaquina: data.data.idMaquina
      };

    } catch (error: any) {
      console.error('Error al crear máquina:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Actualizar máquina
   */
  static async actualizarMaquina(
    id: number,
    maquina: Partial<{
      codigo: string;
      nombre: string;
      estado: 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO';
      fechaCompra: string;
      fechaInicioOperacion: string;
      ubicacion: string;
      observaciones: string;
    }>,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/maquinas/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maquina),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al actualizar máquina' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al actualizar máquina:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Cambiar estado de máquina
   */
  static async cambiarEstado(
    id: number,
    estado: 'ACTIVA' | 'INACTIVA' | 'MANTENIMIENTO',
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/maquinas/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al cambiar estado' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al cambiar estado:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Eliminar máquina (soft delete)
   */
  static async eliminarMaquina(
    id: number,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/maquinas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Error al eliminar máquina' };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error al eliminar máquina:', error);
      return { success: false, error: error.message || 'Error desconocido' };
    }
  }

  /**
   * Buscar máquinas
   */
  static async buscarMaquinas(
    query: string,
    token: string
  ): Promise<Maquina[]> {
    try {
      const response = await fetch(
        `${API_URL}/maquinas/buscar?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Error al buscar máquinas');
      }

      const data = await response.json();
      return data.data || [];

    } catch (error) {
      console.error('Error al buscar máquinas:', error);
      return [];
    }
  }
}
