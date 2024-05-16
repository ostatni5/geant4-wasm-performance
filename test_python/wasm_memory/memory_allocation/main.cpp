
#include <stdio.h>
#include <unistd.h>

int main()
{
    printf("witaj, świecie!\n");

    // sleep for 5 seconds
    sleep(3);

    printf("Memory allocation\n");

    // allocate 100MB of memory
    char *p = new char[100 * 1024 * 1024];
    if (p == nullptr)
    {
        printf("Memory allocation failed\n");
        return 1;
    }

    sleep(1);
    // write to the memory so that the OS actually allocates it
    for (int i = 0; i < 100 * 1024 * 1024; i++)
    {
        p[i] = 0;
    }
    printf("Memory allocated\n");

    sleep(1);

    // free the memory
    delete[] p;
    return 0;
}
