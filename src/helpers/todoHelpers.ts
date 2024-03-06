import { ITodoType } from "./interface"

// Check xem các todo đã check hay chưa
export const isNotCheckedAll = (listTodos : ITodoType[]) => listTodos.find(listTodos => !listTodos.isCompleted)

export const filterByStatus = (listTodos : ITodoType[], status = '', id = '') => {
    switch (status) {
      case 'ACTIVE':
        return listTodos.filter(item => !item.isCompleted)
      case 'COMPLETED':
        return listTodos.filter(item => item.isCompleted)
      case 'REMOVE':
        return listTodos.filter(item => item.id !== id)
      default:
        return listTodos 
    }
  }
  
 export const filterTodosLeft = (listTodos: ITodoType[]) => {
    return listTodos.filter(item => !item.isCompleted)
  }
  
  