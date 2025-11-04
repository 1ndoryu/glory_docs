# 📋 Guía de Calidad para Documentación Glory

## 🎯 Propósito

Esta guía establece los estándares de calidad que debe cumplir toda la documentación de Glory Framework. Sirve como checklist para autores de documentación y como referencia para mantener la consistencia y calidad del proyecto.

## 📊 Checklist de Calidad por Página

### ✅ **Criterios Obligatorios (Deben cumplirse SIEMPRE)**

- [ ] **Frontmatter completo**: `title`, `description` presentes y descriptivos
- [ ] **Enlaces funcionales**: Todos los enlaces internos apuntan a páginas existentes
- [ ] **Sintaxis correcta**: Código sin errores de sintaxis, imports correctos
- [ ] **Estructura lógica**: Contenido organizado de manera intuitiva
- [ ] **Títulos descriptivos**: Usar keywords relevantes en títulos y headers

### 🎨 **Criterios de Excelencia (Altamente Recomendados)**

- [ ] **Tabla de contenidos**: Para páginas > 500 líneas
- [ ] **Ejemplos funcionales**: Código que se puede copiar y usar directamente
- [ ] **Casos de uso reales**: Ejemplos prácticos, no teóricos
- [ ] **Capturas de pantalla**: Para interfaces complejas cuando aplique
- [ ] **Notas de compatibilidad**: Versiones soportadas, requisitos
- [ ] **Links relacionados**: Enlaces a documentación complementaria

### 📝 **Criterios de Contenido**

- [ ] **Introducción clara**: ¿Qué es? ¿Para qué sirve? ¿Cuándo usarlo?
- [ ] **Parámetros documentados**: Todos los parámetros con tipo, descripción, valores por defecto
- [ ] **Ejemplos progresivos**: Desde básico hasta avanzado
- [ ] **Posibles errores**: Problemas comunes y cómo solucionarlos
- [ ] **Mejores prácticas**: Recomendaciones para uso óptimo

## 🔍 **Proceso de Revisión de Calidad**

### **Fase 1: Auto-revisión del Autor**

Antes de hacer commit, el autor debe verificar:

1. **Leer completamente** la página en modo preview
2. **Verificar enlaces** haciendo clic en cada uno
3. **Probar ejemplos** de código cuando sea posible
4. **Revisar ortografía** y gramática
5. **Validar frontmatter** y metadatos

### **Fase 2: Revisión por Pares (Peer Review)**

Otro desarrollador debe verificar:

- Cumplimiento de checklist de calidad
- Claridad técnica y precisión
- Completitud de la información
- Consistencia con el resto de la documentación

### **Fase 3: Validación Técnica**

- Verificar que los ejemplos funcionen
- Comprobar compatibilidad con versiones actuales
- Validar que no haya información obsoleta

## 📈 **Métricas de Calidad**

### **Puntuación de Calidad (0-100)**

| Aspecto | Peso | Criterios |
|---------|------|-----------|
| **Completitud** | 25% | Todos los parámetros y casos de uso documentados |
| **Claridad** | 25% | Lenguaje sencillo, explicaciones detalladas |
| **Funcionalidad** | 20% | Ejemplos que funcionan, enlaces operativos |
| **Estructura** | 15% | Organización lógica, navegación intuitiva |
| **Actualización** | 15% | Información actualizada, versiones correctas |

### **Niveles de Calidad**

- **⭐ Excelente (90-100)**: Documentación completa, clara y actualizada
- **✅ Bueno (75-89)**: Documentación adecuada con pequeñas mejoras posibles
- **⚠️ Regular (60-74)**: Documentación básica que necesita mejoras
- **❌ Deficiente (<60)**: Documentación incompleta o con errores

## 🚨 **Alertas de Calidad**

### **Enlaces Rotos**
- Deben corregirse inmediatamente
- Revisar mensualmente todos los enlaces

### **Ejemplos No Funcionales**
- Corregir o marcar como "obsoleto"
- Proporcionar alternativas funcionales

### **Información Desactualizada**
- Actualizar cuando se detecte
- Marcar versiones específicas cuando aplique

## 🛠️ **Herramientas de Monitoreo**

### **Scripts de Verificación**

```bash
# Verificar enlaces internos
find docs/ -name "*.mdx" -exec grep -l "href=" {} \; | xargs -I {} sh -c 'echo "Verificando {}"; grep "href=" {} | head -5'

# Contar líneas por archivo
find docs/ -name "*.mdx" -exec wc -l {} \; | sort -nr | head -10

# Buscar archivos sin frontmatter
find docs/ -name "*.mdx" -exec sh -c 'head -5 "$1" | grep -q "^---$" || echo "$1"' _ {} \;
```

### **Validaciones Automáticas**

- **Enlaces rotos**: Verificar con linkchecker o similar
- **Sintaxis Markdown**: Usar markdownlint
- **Frontmatter**: Validar YAML con yamllint
- **Consistencia**: Scripts personalizados para verificar patrones

## 📅 **Calendario de Mantenimiento**

### **Semanal**
- Revisar nuevos commits de documentación
- Verificar enlaces en páginas modificadas

### **Mensual**
- Auditoría completa de enlaces
- Revisar métricas de calidad
- Actualizar ejemplos desactualizados

### **Trimestral**
- Revisión completa de toda la documentación
- Actualizar guías según cambios en el framework
- Recopilar feedback de usuarios

## 📊 **Reportes de Calidad**

### **Dashboard de Métricas**
- Páginas por nivel de calidad
- Enlaces rotos pendientes
- Páginas sin actualizar (6+ meses)
- Cobertura de documentación por componente

### **Alertas Automáticas**
- Email cuando se detecten enlaces rotos
- Notificaciones de páginas sin actualizar
- Reportes de calidad por sección

## 🎯 **Mejoras Continuas**

### **Basado en Feedback**
- Recopilar sugerencias de desarrolladores
- Identificar gaps en documentación
- Priorizar mejoras según uso real

### **Tendencias y Patrones**
- Analizar qué páginas se consultan más
- Identificar temas recurrentes en soporte
- Ajustar contenido según necesidades reales

## 📝 **Registro de Cambios**

| Fecha | Cambio | Responsable | Impacto |
|-------|--------|-------------|---------|
| 2025-11-04 | Creación de guía inicial | Sistema | Establece estándares base |
| | | | |

---

**Última actualización:** 4 de noviembre, 2025
**Versión:** 1.0
**Responsable:** Equipo de documentación Glory

