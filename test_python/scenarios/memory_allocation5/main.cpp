#include <unistd.h>
#include <cstdio>

int main()
{
    for (int i = 0; i < 3; i++)
    {
        sleep(1);
        int n = 250 * 1024 * 1024; // 250MB
        char *arr1 = new char[n];
        char *arr2 = new char[n];

        if (arr1 == nullptr || arr2 == nullptr)
        {
            // Memory allocation failed
            return 1;
        }

        for (int i = 0; i < 2; i++)
        {

            // Use the allocated memory
            for (int i = 0; i < n; i++)
            {
                arr1[i] = (char)i;
                arr2[i] = arr1[i] * arr1[i];
            }
            sleep(1); // Wait for a second
        }

        for (int i = 0; i < 100; i += 100)
        {
            printf("arr1[%d] = %d, arr2[%d] = %d\n", i, arr1[i], i, arr2[i]);
        }

        delete[] arr1;
        delete[] arr2;

        sleep(1); // Wait for a second
    }
    sleep(3);

    return 0;
}
