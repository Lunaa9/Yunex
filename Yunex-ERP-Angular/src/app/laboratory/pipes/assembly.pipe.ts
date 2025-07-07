import { Pipe, PipeTransform } from '@angular/core';
import { assembly } from 'src/app/interfaces/lab/assembly.interface';

@Pipe({
  name: 'assembly'
})
export class AssemblyPipe implements PipeTransform {
  
  /**
   * 
   * @param values - arreglo de assemblies
   * @param args - texto del filtro
   * @param page - página actual
   * @returns Un array filtrado por cliente y paginado
   */
  transform(values: Array<assembly>, args: string, page: number): Array<assembly> {
    if (!values) return [];

    const filtered = values.filter(assembly =>
      assembly.client.toLowerCase().includes(args.toLowerCase())
    );

    return filtered.slice(page, page + 5); // paginación básica
  }
}
