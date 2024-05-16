#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

int among_us = 0;

// This is the function to run in the new thread
void *myFunction(void *arg)
{
    // You can do whatever you want here
    printf("Hello from new thread - got %d\n", *(int *)arg);
    among_us++;
    printf("among_us: %d\n", among_us);
    return NULL;
}

int main()
{
    pthread_t newThread;
    int arg = 123;

    printf("Main thread starting\n");
    // Create a new thread that will begin at startRoutine
    if (pthread_create(&newThread, NULL, myFunction, &arg))
    {
        fprintf(stderr, "Error creating new thread\n");
        return 1;
    }

    // Wait for the thread to terminate with pthread_join()
    if (pthread_join(newThread, NULL))
    {
        fprintf(stderr, "Error joining thread\n");
        return 2;
    }

    printf("among_us: %d\n", among_us);
    if (pthread_create(&newThread, NULL, myFunction, &arg))
    {
        fprintf(stderr, "Error creating new thread\n");
        return 1;
    }

    // Wait for the thread to terminate with pthread_join()
    if (pthread_join(newThread, NULL))
    {
        fprintf(stderr, "Error joining thread\n");
        return 2;
    }
    printf("among_us: %d\n", among_us);

    printf("New thread completed\n");

    return 0;
}
