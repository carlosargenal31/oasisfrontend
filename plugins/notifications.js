// Simple notifications plugin for displaying toast messages
export default defineNuxtPlugin((nuxtApp) => {
    // Create a notifications object
    const notifications = {
      // Show a success message
      success(message, timeout = 3000) {
        showNotification(message, 'success', timeout);
      },
      
      // Show an error message
      error(message, timeout = 3000) {
        showNotification(message, 'error', timeout);
      },
      
      // Show an info message
      info(message, timeout = 3000) {
        showNotification(message, 'info', timeout);
      },
      
      // Show a warning message
      warning(message, timeout = 3000) {
        showNotification(message, 'warning', timeout);
      }
    };
    
    // Helper function to create and display a notification
    function showNotification(message, type, timeout) {
      // Create notification element
      const notification = document.createElement('div');
      
      // Set notification styles based on type
      let bgColor, textColor, iconSvg;
      
      switch (type) {
        case 'success':
          bgColor = 'bg-green-500';
          textColor = 'text-white';
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
          break;
        case 'error':
          bgColor = 'bg-red-500';
          textColor = 'text-white';
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
          break;
        case 'info':
          bgColor = 'bg-blue-500';
          textColor = 'text-white';
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
          break;
        case 'warning':
          bgColor = 'bg-yellow-500';
          textColor = 'text-white';
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>';
          break;
        default:
          bgColor = 'bg-gray-500';
          textColor = 'text-white';
          iconSvg = '';
      }
      
      // Set notification content and styling
      notification.className = `fixed top-4 right-4 flex items-center p-4 mb-4 ${bgColor} ${textColor} rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out`;
      notification.innerHTML = `
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3">
          ${iconSvg}
        </div>
        <div class="ml-3 text-sm font-normal">${message}</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 ${textColor} hover:${bgColor} hover:bg-opacity-75" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      `;
      
      // Append to body
      document.body.appendChild(notification);
      
      // Add click event to close button
      const closeButton = notification.querySelector('button');
      closeButton.addEventListener('click', () => {
        notification.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      });
      
      // Auto-remove after timeout
      setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, timeout);
    }
    
    return {
      provide: {
        notify: notifications
      }
    };
  });