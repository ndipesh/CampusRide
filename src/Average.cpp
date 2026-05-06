#include <iostream>
using namespace std;

int main()
{
  int scores[10];
  int sum = 0;
  int highest = 0;
  int passed = 0;

  // Input scores
  for (int i = 0; i < 10; i++)
  {
    cout << "Enter score for student " << i + 1 << ": ";
    cin >> scores[i];

    sum += scores[i];

    if (scores[i] > highest)
    {
      highest = scores[i];
    }

    if (scores[i] >= 70)
    {
      passed++;
    }
  }

  double average = sum / 10.0;

  // Output results
  cout << "\nAverage Score: " << average << endl;
  cout << "Highest Score: " << highest << endl;
  cout << "Students Passed: " << passed << endl;

  return 0;
}
