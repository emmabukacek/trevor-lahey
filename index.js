(function() {
  const token = '**Changes**';
  const searchIndexWaterfall = (text, ...args) => {
    const matchingRegex = args.find(regex => text.search(regex) !== -1);
    if (!matchingRegex) return text;
    const endOfChangesIndex = text.search(matchingRegex);
    return text.slice(0, endOfChangesIndex).trim();
  };

  const getCommitMessage = text => searchIndexWaterfall(
    text,
    /.*?(?=\*\*.*\*\*)/,
    /.*?(?=##)/,
    /.*?(?=!\[\])/
  );

  const prBody = document.querySelector('.js-comment-field').value;
  let changesSplit = prBody.split('**Changes**');
  if (changesSplit.length === 1) changesSplit = prBody.split('## Changes');

  const commitMessage = getCommitMessage(changesSplit.pop());

  document.querySelector('.timeline-comment-wrapper .js-comment-edit-button').click();
  document.querySelector('.js-comment-cancel-button').click();

  const prTitle = document.querySelector('.js-issue-title').innerText.trim();
  const prNumber = document.querySelector('.gh-header-number').innerText.trim();

  const mergeDropdown = document.querySelector('.btn-group-squash .select-menu-button');
  mergeDropdown.click();

  const squashAndMergeXpath = "//div[contains(@class, 'select-menu-item') and contains(., 'Squash and merge')]";
  document.evaluate(squashAndMergeXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue
    .click();

  const mergeButtonEl = document.querySelector('.btn-group-squash .js-details-target');
  mergeButtonEl.click();

  document.querySelector('.merge-commit-title').value = `${prTitle} (${prNumber})`;
  document.querySelector('.merge-commit-message').value = commitMessage;
  document.querySelector('.merge-branch-form').scrollIntoView();
})();
