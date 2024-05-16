#include <string>
#include <iostream>
#include <filesystem>
#include <unistd.h>
namespace fs = std::filesystem;

int main()
{
    sleep(5);
    std::string path = "/";

    for (const auto &entry : fs::directory_iterator(path))
    {
        std::cout << entry.path() << std::endl;
    }
}
